import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, softwareApplicationJsonLd } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/download',
  title: 'Download',
  description:
    'Download VoiceLocal for Mac (Apple Silicon) and the Chrome extension. Start a 7-day free trial—local Whisper transcription, no account required.',
})

export default function DownloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd} />
      {children}
    </>
  )
}
