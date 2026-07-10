import { promises as fs } from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const MAX_MACHINES_PER_LICENSE = 2
const DATA_DIR = path.join(process.cwd(), 'data')
const LICENSES_FILE = path.join(DATA_DIR, 'licenses.json')

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const attempts = new Map<string, { count: number; reset: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = attempts.get(ip)

  if (!record || now > record.reset) {
    attempts.set(ip, { count: 1, reset: now + 3600000 })
    return true
  }

  if (record.count >= 5) return false
  record.count++
  return true
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (!checkRateLimit(ip)) {
      return Response.json(
        { valid: false, reason: 'Too many attempts. Try again later.' },
        { status: 429, headers: CORS_HEADERS },
      )
    }

    const body = (await req.json()) as {
      key?: unknown
      email?: unknown
      machine_id?: unknown
    }
    const key = typeof body.key === 'string' ? body.key.trim().toUpperCase() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const machineId = typeof body.machine_id === 'string' ? body.machine_id.trim() : ''

    if (!key || !email || !machineId) {
      return Response.json(
        { valid: false, reason: 'Missing required fields.' },
        { status: 400, headers: CORS_HEADERS },
      )
    }

    if (!key.startsWith('VLTL-') || key.length !== 24) {
      return Response.json(
        { valid: false, reason: 'Invalid license key format.' },
        { headers: CORS_HEADERS },
      )
    }

    let licenses: any[]
    try {
      const raw = await fs.readFile(LICENSES_FILE, 'utf-8')
      licenses = JSON.parse(raw)
      if (!Array.isArray(licenses)) licenses = []
    } catch {
      return Response.json(
        { valid: false, reason: 'License not found.' },
        { headers: CORS_HEADERS },
      )
    }

    const license = licenses.find(
      (l: any) =>
        String(l.key).toUpperCase() === key &&
        String(l.email).toLowerCase() === email.toLowerCase(),
    )

    if (!license) {
      return Response.json(
        { valid: false, reason: "License key not found or email doesn't match." },
        { headers: CORS_HEADERS },
      )
    }

    if (!license.machines) license.machines = []

    const isExistingMachine = license.machines.includes(machineId)

    if (!isExistingMachine && license.machines.length >= MAX_MACHINES_PER_LICENSE) {
      return Response.json(
        {
          valid: false,
          reason: 'License already activated on 2 Macs. Deactivate one first.',
        },
        { headers: CORS_HEADERS },
      )
    }

    if (!isExistingMachine) {
      license.machines.push(machineId)
      await fs.writeFile(LICENSES_FILE, JSON.stringify(licenses, null, 2), 'utf-8')
    }

    return Response.json(
      {
        valid: true,
        email: license.email,
        activated_at: license.createdAt,
      },
      { headers: CORS_HEADERS },
    )
  } catch (error) {
    console.error('License verification failed:', error)
    return Response.json(
      { valid: false, reason: 'Invalid request.' },
      { status: 400, headers: CORS_HEADERS },
    )
  }
}
