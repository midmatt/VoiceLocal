import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'VoiceLocal — Private Voice Dictation for Mac',
  description:
    'VoiceLocal is a local-first dictation app for Mac with a Chrome extension. Transcribe speech on-device with Whisper—no cloud, no subscription, $25 once.',
  absoluteTitle: true,
})

function PrivacySection() {
  return (
    <section
      className="relative px-6 py-20 md:py-[80px]"
      style={{
        background: 'linear-gradient(135deg, #0d0d1a 0%, #0f0f24 100%)',
        borderTop: '1px solid rgba(91, 110, 245, 0.1)',
        borderBottom: '1px solid rgba(91, 110, 245, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Blurred purple circle */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'rgba(91, 110, 245, 0.06)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <h2
          className="mb-8 text-[2.625rem] font-bold md:text-[4rem]"
          style={{
            color: '#5B6EF5',
            textShadow: '0 0 60px rgba(91, 110, 245, 0.3)',
          }}
        >
          &ldquo;Your voice is yours.&rdquo;
        </h2>

        <p
          className="mb-10 max-w-[600px] text-base leading-[1.7] md:text-lg"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          VoiceLocal was built by a cybersecurity student who knows what happens
          when your data goes to someone else&apos;s server. So it doesn&apos;t.
          Not your audio. Not your text. Not your usage patterns. Nothing.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {['0 bytes sent to any server', '100% on-device processing'].map(
            (label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full"
                style={{
                  padding: '8px 20px',
                  fontSize: '14px',
                  background: 'rgba(91, 110, 245, 0.1)',
                  border: '1px solid rgba(91, 110, 245, 0.3)',
                  color: '#8b8fdb',
                }}
              >
                {label}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <JsonLd data={softwareApplicationJsonLd} />
      <Hero />
      <HowItWorks />
      <Features />
      <PrivacySection />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
