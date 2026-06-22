import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { generateLicenseKey, storeLicenseKey } from '@/lib/license'
import { sendLicenseEmail } from '@/lib/resend'

export const runtime = 'nodejs'
// Webhook signature verification needs the raw, unparsed body.
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured.')
    return Response.json({ error: 'Webhook not configured.' }, { status: 500 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return Response.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  // Read the raw request body for signature verification.
  const rawBody = await req.text()

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return Response.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email

    if (!email) {
      // Nothing we can do without an email, but don't ask Stripe to retry.
      console.error('checkout.session.completed had no customer email.', session.id)
      return Response.json({ received: true }, { status: 200 })
    }

    try {
      const licenseKey = generateLicenseKey(email)
      await storeLicenseKey(licenseKey, email, session.id)

      try {
        await sendLicenseEmail(email, licenseKey)
      } catch (emailError) {
        // Key is stored — log the email failure but still ack so Stripe
        // doesn't retry and trigger a duplicate send.
        console.error('Failed to send license email:', emailError)
      }
    } catch (error) {
      // Storage/generation failed. Log it; still return 200 to avoid retries
      // that could double-send. Manual recovery via Stripe dashboard if needed.
      console.error('Failed to process completed checkout:', error)
    }
  }

  return Response.json({ received: true }, { status: 200 })
}
