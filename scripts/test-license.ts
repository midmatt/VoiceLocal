import {
  generateLicenseKey,
  storeLicenseKey,
  findLicense,
  verifyLicenseKey,
} from '../lib/license'

async function main() {
  const email = 'test@example.com'

  const key = generateLicenseKey(email)
  console.log('Generated key:', key)
  console.log('  starts with VLTL-:', key.startsWith('VLTL-'))
  console.log('  length === 24   :', key.length === 24)
  console.log('  format check    :', /^VLTL-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}$/.test(key))
  console.log('  verifyLicenseKey:', verifyLicenseKey(key, email))

  const record = await storeLicenseKey(key, email, 'cs_test_session_123')
  console.log('Stored record:', record)

  const found = await findLicense(key, email)
  console.log('findLicense (match) -> valid:', found !== null)

  const notFound = await findLicense('VLTL-0000-0000-0000-0000', email)
  console.log('findLicense (no match) -> valid:', notFound !== null)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
