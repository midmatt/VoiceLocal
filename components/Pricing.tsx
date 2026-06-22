'use client'

import Link from 'next/link'
import { useState } from 'react'

const FEATURES = [
  '7-day free trial, no card required',
  'Full access to all features during trial',
  '$25 one-time after trial ends',
  'No subscription, ever',
  'All future updates included',
  'Works on up to 2 Macs',
] as const

export default function Pricing() {
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  async function handleBuyNow() {
    setCheckoutLoading(true)
    setCheckoutError(null)

    try {
      const response = await fetch('/api/checkout', { method: 'POST' })

      if (!response.ok) {
        throw new Error('Checkout is not available yet. Please try again later.')
      }

      const data: { url?: string } = await response.json()

      if (data.url) {
        window.location.href = data.url
        return
      }

      throw new Error('No checkout URL returned. Please try again later.')
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again later.',
      )
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <section id="pricing" className="px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="mb-12 text-center text-[2rem] font-semibold md:mb-16 md:text-[3rem]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Simple pricing.
        </h2>

        <div className="mx-auto w-full max-w-[480px]">
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: '#13131f',
              border: '1px solid rgba(91, 110, 245, 0.12)',
            }}
          >
            <p
              className="mb-1 text-sm font-medium uppercase tracking-widest"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Free Trial
            </p>
            <p
              className="mb-2 text-2xl"
              style={{ color: 'var(--color-text-muted)' }}
              aria-hidden
            >
              ↓
            </p>
            <p
              className="mb-1 text-xl font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              VoiceLocal
            </p>
            <p
              className="text-5xl font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              $25
            </p>
            <p
              className="mb-8 text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              one-time
            </p>

            <ul className="mb-8 space-y-3 text-left">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-[15px]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <span
                    className="mt-0.5 shrink-0 font-semibold"
                    style={{ color: '#4ade80' }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3">
              <Link
                href="/download"
                className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#5B6EF5] px-8 text-base font-semibold text-white transition-colors hover:bg-[#4a5ce0]"
              >
                Start Free Trial
              </Link>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={checkoutLoading}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-xl border border-[rgba(91,110,245,0.4)] bg-transparent px-8 text-base font-semibold text-[#e8e8f4] transition-colors hover:border-[rgba(91,110,245,0.6)] hover:bg-[rgba(91,110,245,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {checkoutLoading ? 'Redirecting…' : 'Buy Now — $25'}
              </button>
            </div>

            {checkoutError && (
              <p
                className="mt-3 text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
                role="alert"
              >
                {checkoutError}
              </p>
            )}

            <p
              className="mt-4 text-[13px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              License delivered by email. Instant activation.
            </p>
          </div>

          <p
            className="mt-6 text-center text-[13px] leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            VoiceType charges $8-12/month ($96-144/year).
            <br />
            VoiceLocal is $25. Once.
          </p>
        </div>
      </div>
    </section>
  )
}
