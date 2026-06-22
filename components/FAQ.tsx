'use client'

import { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'Does my audio ever leave my Mac?',
    answer:
      'Never. Transcription runs locally using Whisper. VoiceLocal has no servers and makes no network requests during dictation.',
  },
  {
    question: 'Which Mac models are supported?',
    answer:
      'Any Mac running macOS 13 (Ventura) or later. Apple Silicon (M1/M2/M3/M4) recommended for best performance. Intel Macs are supported but larger models will be slower.',
  },
  {
    question: 'Does it work in Chrome and Electron apps?',
    answer:
      'Yes — VoiceLocal includes a companion Chrome extension (free) that enables injection into Chrome tabs, Cursor, VS Code, Slack, Discord, and other Electron-based apps.',
  },
  {
    question: "What's the Chrome extension?",
    answer:
      'A lightweight extension that connects to VoiceLocal over a local WebSocket. It receives transcribed text and injects it at your cursor position. It never communicates with any external server.',
  },
  {
    question: 'What is AI formatting?',
    answer:
      'An optional post-processing step that removes filler words ("um", "uh", "like") and structures longer dictations. Runs locally via Ollama (free, private) or with your own Anthropic API key.',
  },
  {
    question: 'How does the license work?',
    answer:
      "After purchase, you receive a license key by email. Enter it in VoiceLocal's settings to activate. Works on up to 2 Macs simultaneously.",
  },
  {
    question: 'What happens after the 7-day trial?',
    answer:
      'The app continues to work but shows a prompt to purchase. Your dictation history and settings are preserved.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'Yes — 30-day no-questions-asked refund. Email hello@voicelocalapp.com.',
  },
] as const

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggleItem(index: number) {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="px-6 py-20 md:py-[120px]">
      <div className="mx-auto max-w-[800px]">
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: '#13131f',
                  border: '1px solid rgba(91, 110, 245, 0.12)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-base font-semibold md:text-lg"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.question}
                  </span>
                  <span
                    className="shrink-0 text-xl transition-transform duration-300"
                    style={{
                      color: '#5B6EF5',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p
                      className="px-6 pb-5 text-[15px] leading-[1.7]"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
