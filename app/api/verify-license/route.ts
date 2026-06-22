import { findLicense, verifyLicenseKey } from '@/lib/license'

export const runtime = 'nodejs'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { key?: unknown; email?: unknown }
    const key = typeof body.key === 'string' ? body.key : ''
    const email = typeof body.email === 'string' ? body.email : ''

    if (!key || !email) {
      return Response.json(
        { valid: false, error: 'Both key and email are required.' },
        { status: 400, headers: CORS_HEADERS },
      )
    }

    if (!verifyLicenseKey(key, email)) {
      return Response.json({ valid: false }, { headers: CORS_HEADERS })
    }

    const record = await findLicense(key, email)
    return Response.json({ valid: record !== null }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('License verification failed:', error)
    return Response.json(
      { valid: false, error: 'Invalid request.' },
      { status: 400, headers: CORS_HEADERS },
    )
  }
}
