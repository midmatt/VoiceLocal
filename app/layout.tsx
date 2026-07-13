import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import JsonLd from '@/components/JsonLd'
import { HAS_OG_IMAGE, OG_IMAGE_PATH, organizationJsonLd, SITE_NAME, SITE_URL } from '@/lib/seo'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Private Voice Dictation for Mac`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'VoiceLocal is local-first dictation for Mac with a Chrome extension. Transcribe on-device with Whisper—no cloud, no subscription, $25 once.',
  ...(HAS_OG_IMAGE
    ? {
        openGraph: {
          images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
        },
      }
    : {}),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  )
}
