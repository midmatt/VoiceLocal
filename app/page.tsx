import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

function PrivacySection() {
  return (
    <section
      className="px-6 py-20 md:py-[120px]"
      style={{ background: '#0d0d1a' }}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
        <h2
          className="mb-8 text-[2.625rem] font-bold md:text-[4.5rem]"
          style={{ color: '#5B6EF5' }}
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
                className="inline-flex items-center rounded-full px-4 py-1.5 text-[13px]"
                style={{
                  background: 'rgba(91, 110, 245, 0.12)',
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
