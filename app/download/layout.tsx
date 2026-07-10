import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download VoiceLocal — Private Voice Dictation for Mac',
  description:
    'Download VoiceLocal for Mac. Private, offline voice dictation powered by Whisper AI. 7-day free trial, no payment required.',
}

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
