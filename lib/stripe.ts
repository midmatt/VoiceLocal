import Stripe from 'stripe'

let cached: Stripe | null = null

/**
 * Lazily construct the Stripe client. Avoids throwing at module-load /
 * build time when STRIPE_SECRET_KEY is not present in the environment.
 */
export function getStripe(): Stripe {
  if (cached) return cached

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not set.')
  }

  cached = new Stripe(secretKey, {
    apiVersion: '2026-05-27.dahlia',
  })

  return cached
}
