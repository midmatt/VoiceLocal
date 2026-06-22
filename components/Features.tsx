const FEATURES = [
  {
    icon: '🔒',
    title: 'Completely private',
    body: 'Your audio never touches a server. Transcription runs on your Mac using Whisper — the same model used by OpenAI, running locally.',
  },
  {
    icon: '⚡',
    title: 'Works everywhere',
    body: 'Native Mac apps, Chrome tabs, Cursor, VS Code, Slack, Discord — VoiceLocal injects text at the cursor position in any app.',
  },
  {
    icon: '🧠',
    title: 'AI formatting',
    body: 'Removes filler words, fixes punctuation, and structures long dictations into paragraphs or bullet points — locally via Ollama, or with your own API key.',
  },
  {
    icon: '⌨️',
    title: 'Any hotkey',
    body: "Set any key combination you want. Press to start, press to stop. That's the whole workflow.",
  },
  {
    icon: '🎙️',
    title: 'Multiple models',
    body: 'Choose your accuracy vs speed tradeoff — tiny (fastest), base, small, or large-v3-turbo (best accuracy for names and technical terms).',
  },
  {
    icon: '💰',
    title: 'Pay once',
    body: '$25. No monthly fees, no account, no usage limits. One payment, yours forever. Future updates included.',
  },
] as const

export default function Features() {
  return (
    <section className="px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1100px]">
        <h2
          className="mb-12 text-center text-[2rem] font-semibold md:mb-16 md:text-[3rem]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Built for people who can&apos;t afford leaks.
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl p-7"
              style={{
                background: '#13131f',
                border: '1px solid rgba(91, 110, 245, 0.12)',
              }}
            >
              <div
                className="mb-4 text-2xl"
                style={{ color: '#5B6EF5' }}
                aria-hidden
              >
                {feature.icon}
              </div>
              <h3
                className="mb-3 text-lg font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[15px] leading-[1.7]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
