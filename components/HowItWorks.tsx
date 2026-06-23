const STEPS = [
  {
    number: '1',
    title: 'Press your hotkey',
    body: 'Hit Cmd+Shift+Space from anywhere on your Mac. VoiceLocal activates instantly — no app switching, no clicking.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="2"
          stroke="#5B6EF5"
          strokeWidth="1.5"
        />
        <path
          d="M6 10h2M10 10h2M14 10h2M18 10h1"
          stroke="#5B6EF5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Say what you mean',
    body: 'Speak naturally. VoiceLocal transcribes in real time using Whisper AI, running entirely on your device.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z"
          stroke="#5B6EF5"
          strokeWidth="1.5"
        />
        <path
          d="M6 11v1a6 6 0 0 0 12 0v-1M12 18v3"
          stroke="#5B6EF5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 21h8"
          stroke="#5B6EF5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Text appears instantly',
    body: 'Press again. Your words are injected directly into whatever field you were in — no copy-paste needed.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 13l4 4L19 7"
          stroke="#5B6EF5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 4h16v16H4V4Z"
          stroke="#5B6EF5"
          strokeWidth="1.5"
          strokeOpacity="0.35"
        />
      </svg>
    ),
  },
] as const

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 md:py-[80px]">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="mb-12 text-center text-[2rem] font-semibold md:mb-16 md:text-[3rem]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Three keystrokes. Done.
        </h2>

        <div className="relative">
          {/* Connecting line behind cards */}
          <div
            className="absolute left-0 right-0 top-1/2 hidden md:block"
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #5B6EF5, transparent)',
              transform: 'translateY(-50%)',
            }}
            aria-hidden
          />

          <div className="relative grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <article
                key={step.number}
                className="relative overflow-hidden rounded-2xl p-7"
                style={{
                  background: '#13131f',
                  border: '1px solid rgba(91, 110, 245, 0.12)',
                }}
              >
                {/* Step number watermark */}
                <span
                  className="pointer-events-none absolute select-none font-bold leading-none"
                  style={{
                    color: 'rgba(91, 110, 245, 0.15)',
                    fontSize: '120px',
                    left: '-8px',
                    top: '-20px',
                  }}
                  aria-hidden
                >
                  {step.number}
                </span>

                <div className="relative z-10 pt-10">
                  {/* Icon with circle background */}
                  <div
                    className="mb-4 flex items-center justify-center"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(91, 110, 245, 0.12)',
                      border: '1px solid rgba(91, 110, 245, 0.2)',
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className="mb-3 text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[15px] leading-[1.7]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
