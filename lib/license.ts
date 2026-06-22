import crypto from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const LICENSES_FILE = path.join(DATA_DIR, 'licenses.json')

export interface LicenseRecord {
  key: string
  email: string
  sessionId: string
  createdAt: string
}

export function generateLicenseKey(email: string): string {
  const timestamp = Date.now().toString()
  const hash = crypto
    .createHmac('sha256', process.env.LICENSE_SECRET!)
    .update(`${email}:${timestamp}`)
    .digest('hex')
    .toUpperCase()
  // Format: VLTL-XXXX-XXXX-XXXX-XXXX
  return `VLTL-${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}`
}

export function verifyLicenseKey(key: string, _email: string): boolean {
  // Format check — full verification is done against stored keys in readLicenses().
  return key.startsWith('VLTL-') && key.length === 24
}

async function readLicenses(): Promise<LicenseRecord[]> {
  try {
    const raw = await fs.readFile(LICENSES_FILE, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    // File doesn't exist yet or is unreadable/corrupt — start fresh.
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }
    console.error('Failed to read licenses file, starting fresh:', error)
    return []
  }
}

export async function storeLicenseKey(
  key: string,
  email: string,
  sessionId: string,
): Promise<LicenseRecord> {
  await fs.mkdir(DATA_DIR, { recursive: true })

  const licenses = await readLicenses()

  const record: LicenseRecord = {
    key,
    email,
    sessionId,
    createdAt: new Date().toISOString(),
  }

  // Avoid double-writing if this Stripe session was already processed.
  const existing = licenses.find((entry) => entry.sessionId === sessionId)
  if (existing) {
    return existing
  }

  licenses.push(record)
  await fs.writeFile(LICENSES_FILE, JSON.stringify(licenses, null, 2), 'utf-8')

  return record
}

export async function findLicense(
  key: string,
  email: string,
): Promise<LicenseRecord | null> {
  const licenses = await readLicenses()
  const normalizedKey = key.trim().toUpperCase()
  const normalizedEmail = email.trim().toLowerCase()

  return (
    licenses.find(
      (entry) =>
        entry.key.toUpperCase() === normalizedKey &&
        entry.email.toLowerCase() === normalizedEmail,
    ) ?? null
  )
}
