import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

export async function POST() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

    if (!process.env.STRIPE_PRICE_ID) {
      return Response.json(
        { error: 'STRIPE_PRICE_ID is not configured.' },
        { status: 500, headers: CORS_HEADERS },
      )
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#pricing`,
      metadata: {
        product: 'voicelocal_lifetime',
      },
    })

    return Response.json({ url: session.url }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Checkout session creation failed:', error)
    return Response.json(
      { error: 'Failed to create checkout session.' },
      { status: 500, headers: CORS_HEADERS },
    )
  }
}
