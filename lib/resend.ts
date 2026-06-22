import { Resend } from 'resend'

let cached: Resend | null = null

function getResend(): Resend {
  if (cached) return cached
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set.')
  }
  cached = new Resend(apiKey)
  return cached
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL
  ? `VoiceLocal <${process.env.RESEND_FROM_EMAIL}>`
  : 'VoiceLocal <hello@voicelocalapp.com>'

export async function sendLicenseEmail(email: string, licenseKey: string) {
  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your VoiceLocal license key',
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background: #080810; color: #e8e8f4;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #5B6EF5; font-size: 28px; margin: 0;">VoiceLocal</h1>
          <p style="color: #8b8fb8; margin: 8px 0 0;">Private dictation for Mac</p>
        </div>
        <h2 style="font-size: 20px; color: #e8e8f4;">Your license key</h2>
        <p style="color: #8b8fb8;">Thanks for purchasing VoiceLocal. Here's your license key:</p>
        <div style="background: #13131f; border: 1px solid rgba(91,110,245,0.3); border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
          <code style="font-size: 22px; color: #5B6EF5; letter-spacing: 2px; font-family: monospace;">${licenseKey}</code>
        </div>
        <h3 style="color: #e8e8f4;">How to activate:</h3>
        <ol style="color: #8b8fb8; line-height: 1.8;">
          <li>Open VoiceLocal (tray icon in your menu bar)</li>
          <li>Click Settings → License</li>
          <li>Paste your license key and click Activate</li>
        </ol>
        <p style="color: #8b8fb8;">Works on up to 2 Macs. Need help? Reply to this email.</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 32px 0;">
        <p style="color: #4a4a6a; font-size: 13px; text-align: center;">VoiceLocal · voicelocalapp.com · 30-day refund guarantee</p>
      </div>
    `,
  })
}
