'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PurchaseAgreementCheckbox } from '@/components/LegalAgreementCheckbox'

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
  const [purchaseAgreed, setPurchaseAgreed] = useState(false)

  async function handleBuyNow(e?: React.MouseEvent) {
    if (!purchaseAgreed) {
      e?.preventDefault()
      return
    }
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
    <section id="pricing" className="px-6 py-16 md:py-[80px]">
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
              border: '1px solid rgba(91, 110, 245, 0.3)',
              boxShadow:
                '0 0 0 1px rgba(91, 110, 245, 0.3), 0 40px 80px rgba(0, 0, 0, 0.5), 0 0 40px rgba(91, 110, 245, 0.08)',
            }}
          >
            <div
              className="mb-2 flex items-center justify-center gap-3"
            >
              <p
                className="text-sm font-medium uppercase tracking-widest"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Free Trial
              </p>
              <span
                style={{ color: 'var(--color-text-muted)', fontSize: '20px' }}
                aria-hidden
              >
                ↓
              </span>
            </div>

            <div className="mb-2 flex items-center justify-center gap-2">
              {/* Mini waveform SVG */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <rect x="1" y="5" width="2" height="6" rx="1" fill="#5B6EF5" />
                <rect x="4.5" y="2" width="2" height="12" rx="1" fill="#5B6EF5" />
                <rect x="8" y="4" width="2" height="8" rx="1" fill="#5B6EF5" />
                <rect x="11.5" y="3" width="2" height="10" rx="1" fill="#5B6EF5" />
              </svg>
              <p
                className="text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                VoiceLocal
              </p>
            </div>

            <p
              className="font-extrabold"
              style={{
                color: 'var(--color-text-primary)',
                fontSize: '56px',
                fontWeight: 800,
                lineHeight: 1.1,
              }}
            >
              $25
            </p>
            <p
              className="mb-8 text-sm font-medium"
              style={{ color: '#5B6EF5' }}
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

            <PurchaseAgreementCheckbox
              id="pricing-purchase-agreement"
              checked={purchaseAgreed}
              onChange={setPurchaseAgreed}
              className="mb-4 text-left"
            />

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
                disabled={!purchaseAgreed || checkoutLoading}
                aria-disabled={!purchaseAgreed || checkoutLoading}
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

          {/* Competitor comparison mini card */}
          <div
            className="mt-4 rounded-xl text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '12px',
              padding: '16px 24px',
            }}
          >
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              VoiceType charges $8-12/month ($96-144/year).
              <br />
              VoiceLocal is <span style={{ color: 'var(--color-text-secondary)' }}>$25. Once.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
