'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import WaveformAnimation from '@/components/WaveformAnimation'

const TRUST_BADGES = [
  { icon: '🔒', text: 'Zero data sent' },
  { icon: '⚡', text: 'Works in every app' },
  { icon: '💰', text: '$25 once, forever' },
]

export default function Hero() {
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
    <>
      {/* ── Fixed Nav ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          background: 'rgba(8, 8, 16, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/logo.png"
            alt="VoiceLocal logo"
            width={28}
            height={28}
            style={{ height: '28px', width: 'auto' }}
          />
          <span
            style={{ color: '#e8e8f4', fontWeight: 600, fontSize: '16px' }}
          >
            VoiceLocal
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link
            href="/download"
            style={{
              color: '#8b8fb8',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            Download
          </Link>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={checkoutLoading}
            style={{
              color: '#e8e8f4',
              fontSize: '14px',
              fontWeight: 500,
              background: 'none',
              border: 'none',
              cursor: checkoutLoading ? 'not-allowed' : 'pointer',
              padding: 0,
              opacity: checkoutLoading ? 0.6 : 1,
            }}
          >
            {checkoutLoading ? 'Redirecting…' : 'Buy — $25'}
          </button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
          overflow: 'hidden',
        }}
      >
        {/* Blob: top-right */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-80px',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(91,110,245,0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        {/* Blob: bottom-left */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '0',
            left: '-80px',
            width: '500px',
            height: '500px',
            background:
              'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* ── Main content ── */}
        <div
          className="hero-content-wrap"
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            minHeight: 'calc(100vh - 200px)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="hero-split">
            {/* ── Left side ── */}
            <div className="hero-left">
              {/* Eyebrow */}
              <p
                style={{
                  color: '#5B6EF5',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '28px',
                  margin: '0 0 28px',
                }}
              >
                Voice Dictation for Mac
              </p>

              {/* Stacked headline */}
              <h1 style={{ margin: '0 0 28px', padding: 0 }}>
                <span className="hero-headline hero-headline--light">
                  Dictate
                </span>
                <span className="hero-headline hero-headline--light">
                  anywhere.
                </span>
                <span className="hero-headline hero-headline--accent">
                  Privately.
                </span>
              </h1>

              {/* Subheadline */}
              <p
                style={{
                  fontSize: '17px',
                  color: '#8b8fb8',
                  maxWidth: '420px',
                  lineHeight: 1.7,
                  margin: '0 0 40px',
                }}
              >
                VoiceLocal transcribes your voice locally on your Mac — no
                cloud, no subscription, no account. Press a hotkey, speak, and
                your words appear in any app instantly.
              </p>

              {/* CTA row */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '24px',
                }}
              >
                <Link
                  href="/download"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '52px',
                    padding: '0 28px',
                    borderRadius: '12px',
                    background: '#5B6EF5',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '16px',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Download Free Trial
                </Link>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={checkoutLoading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '52px',
                    padding: '0 28px',
                    borderRadius: '12px',
                    background: 'transparent',
                    color: '#e8e8f4',
                    fontWeight: 600,
                    fontSize: '16px',
                    border: '1px solid rgba(91,110,245,0.4)',
                    cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                    opacity: checkoutLoading ? 0.6 : 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {checkoutLoading ? 'Redirecting…' : 'Buy Now — $25'}
                </button>
              </div>

              {checkoutError && (
                <p
                  style={{
                    color: '#8b8fb8',
                    fontSize: '14px',
                    marginBottom: '16px',
                  }}
                  role="alert"
                >
                  {checkoutError}
                </p>
              )}

              {/* Trust badges */}
              <div
                style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
              >
                {TRUST_BADGES.map(({ icon, text }) => (
                  <span
                    key={text}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 14px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '999px',
                      fontSize: '12px',
                      color: '#8b8fb8',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {icon} {text}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right side ── */}
            <div className="hero-right">
              {/* Floating dark card */}
              <div className="hero-card">
                {/* Card top bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {/* Mini waveform icon */}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden
                    >
                      <rect x="1" y="5" width="2" height="6" rx="1" fill="#5B6EF5" />
                      <rect x="4.5" y="2" width="2" height="12" rx="1" fill="#5B6EF5" />
                      <rect x="8" y="4" width="2" height="8" rx="1" fill="#5B6EF5" />
                      <rect x="11.5" y="3" width="2" height="10" rx="1" fill="#5B6EF5" />
                    </svg>
                    <span
                      style={{
                        color: '#e8e8f4',
                        fontSize: '13px',
                        fontWeight: 600,
                      }}
                    >
                      VoiceLocal
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <div className="recording-dot" />
                    <span
                      style={{
                        color: '#ef4444',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      Recording
                    </span>
                  </div>
                </div>

                {/* Waveform — scaled up, bg stripped */}
                <div
                  className="waveform-card-wrapper"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: 'scale(1.3)',
                    transformOrigin: 'center center',
                    margin: '0 0 20px',
                    overflow: 'hidden',
                  }}
                >
                  <WaveformAnimation />
                </div>

                {/* Mock text output */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    color: '#e8e8f4',
                    lineHeight: 1.65,
                    marginBottom: '20px',
                    minHeight: '88px',
                  }}
                >
                  &ldquo;Prepare the quarterly report for the board meeting.
                  Include slides on revenue, customer growth, and Q4
                  projections.&rdquo;
                  <span className="hero-cursor" aria-hidden />
                </div>

                {/* Bottom injection row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#8b8fb8',
                  }}
                >
                  {/* Notion-ish placeholder icon */}
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.1)',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#e8e8f4',
                      flexShrink: 0,
                    }}
                  >
                    N
                  </span>
                  <span>Injected into: Notion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
