import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download VoiceLocal — Private Voice Dictation for Mac',
  description:
    'Download VoiceLocal for Mac. Private, offline voice dictation powered by Whisper AI. 7-day free trial, no payment required.',
}

const REQUIREMENTS = [
  { label: 'OS', value: 'macOS 13 (Ventura) or later' },
  { label: 'Chip', value: 'Apple Silicon (M1/M2/M3/M4)' },
  { label: 'RAM', value: '8 GB minimum (16 GB recommended for large models)' },
  { label: 'Disk', value: '~2 GB for app + models' },
]

export default function DownloadPage() {
  return (
    <>
      {/* Nav */}
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
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <Image
            src="/logo.png"
            alt="VoiceLocal logo"
            width={28}
            height={28}
            style={{ height: '28px', width: 'auto' }}
          />
          <span style={{ color: '#e8e8f4', fontWeight: 600, fontSize: '16px' }}>
            VoiceLocal
          </span>
        </Link>
      </nav>

      <main
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        <div className="mx-auto max-w-[640px] px-6">
          {/* Hero area */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo.png"
                alt="VoiceLocal"
                width={64}
                height={64}
                style={{ height: '64px', width: 'auto' }}
              />
            </div>
            <h1
              className="mb-3 text-[2rem] font-bold md:text-[2.5rem]"
              style={{ color: '#e8e8f4' }}
            >
              Download VoiceLocal
            </h1>
            <p
              className="text-[15px]"
              style={{ color: '#8b8fb8' }}
            >
              Version 0.1.0 &middot; macOS 13+ &middot; Apple Silicon
            </p>
          </div>

          {/* Download button */}
          <div className="mb-10 flex justify-center">
            <a
              href="https://github.com/matthewvella/voicelocal/releases/latest/download/VoiceLocal.dmg"
              className="inline-flex h-[56px] items-center justify-center rounded-xl bg-[#5B6EF5] px-10 text-base font-semibold text-white transition-colors hover:bg-[#4a5ce0]"
              style={{
                boxShadow: '0 0 40px rgba(91, 110, 245, 0.2)',
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '10px' }}
                aria-hidden
              >
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download for Mac (Apple Silicon)
            </a>
          </div>

          {/* System requirements card */}
          <div
            className="mb-10 rounded-2xl p-6"
            style={{
              background: '#13131f',
              border: '1px solid rgba(91, 110, 245, 0.15)',
            }}
          >
            <h2
              className="mb-4 text-base font-semibold"
              style={{ color: '#e8e8f4' }}
            >
              System Requirements
            </h2>
            <div className="space-y-3">
              {REQUIREMENTS.map((req) => (
                <div
                  key={req.label}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span
                    className="shrink-0 text-[13px] font-medium uppercase tracking-wider"
                    style={{ color: '#4a4a6a' }}
                  >
                    {req.label}
                  </span>
                  <span
                    className="text-right text-[14px]"
                    style={{ color: '#8b8fb8' }}
                  >
                    {req.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* License activation section */}
          <div
            className="mb-8 rounded-2xl p-6"
            style={{
              background: '#13131f',
              border: '1px solid rgba(91, 110, 245, 0.15)',
            }}
          >
            <h2
              className="mb-2 text-base font-semibold"
              style={{ color: '#e8e8f4' }}
            >
              Already downloaded?
            </h2>
            <p
              className="mb-4 text-[14px]"
              style={{ color: '#8b8fb8' }}
            >
              Enter your license key:
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="h-[44px] flex-1 rounded-lg border bg-transparent px-4 text-[14px] outline-none transition-colors focus:border-[rgba(91,110,245,0.5)]"
                style={{
                  borderColor: 'rgba(91, 110, 245, 0.2)',
                  color: '#e8e8f4',
                }}
                disabled
              />
              <button
                type="button"
                className="h-[44px] shrink-0 rounded-lg px-5 text-[14px] font-semibold transition-colors"
                style={{
                  background: 'rgba(91, 110, 245, 0.15)',
                  color: '#5B6EF5',
                  border: '1px solid rgba(91, 110, 245, 0.3)',
                  cursor: 'not-allowed',
                  opacity: 0.6,
                }}
                disabled
              >
                Activate
              </button>
            </div>
            <p
              className="mt-3 text-[13px]"
              style={{ color: '#4a4a6a' }}
            >
              License activation connects to the VoiceLocal app — coming in a future update.
            </p>
          </div>

          {/* Trial note */}
          <p
            className="mb-6 text-center text-[14px]"
            style={{ color: '#8b8fb8' }}
          >
            Starting your 7-day free trial — no payment required.
          </p>

          {/* Buy link */}
          <p className="text-center">
            <Link
              href="/#pricing"
              className="text-[14px] transition-colors hover:underline"
              style={{ color: '#5B6EF5' }}
            >
              Want to skip the trial? Buy now for $25 &rarr;
            </Link>
          </p>
        </div>
      </main>
    </>
  )
}
