import type { Metadata } from 'next'

/** Canonical site URL — keep in sync with NEXT_PUBLIC_SITE_URL on Vercel. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://voicelocalapp.com'

export const SITE_NAME = 'VoiceLocal'

export const SUPPORT_EMAIL = 'support@voicelocalapp.com'

/**
 * Social preview image for Open Graph / Twitter cards.
 * Add `public/og-image.png` (1200×630px) and set this to true to enable
 * og:image / twitter:image across the site. Until then, link previews will
 * render without a custom image.
 */
export const HAS_OG_IMAGE = true

export const OG_IMAGE_PATH = '/og-image.png'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

type PageSeoOptions = {
  /** Path only, e.g. `/download` */
  path: `/${string}` | '/'
  title: string
  description: string
  /** Set false for transactional pages like /success */
  index?: boolean
  /** Use full title as-is (for home page) instead of the `%s — VoiceLocal` template */
  absoluteTitle?: boolean
}

function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}

function openGraphImages() {
  if (!HAS_OG_IMAGE) return undefined

  return [
    {
      url: OG_IMAGE_PATH,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: `${SITE_NAME} — private, on-device voice dictation for Mac`,
    },
  ]
}

/** Build consistent per-route metadata with canonical, OG, and Twitter tags. */
export function pageMetadata({
  path,
  title,
  description,
  index = true,
  absoluteTitle = false,
}: PageSeoOptions): Metadata {
  const url = absoluteUrl(path)
  const images = openGraphImages()
  const resolvedTitle = absoluteTitle ? { absolute: title } : title

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: url,
    },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: absoluteTitle ? title : `${title} — ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: absoluteTitle ? title : `${title} — ${SITE_NAME}`,
      description,
      ...(images ? { images: [OG_IMAGE_PATH] } : {}),
    },
  }
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl('/logo.png'),
  email: SUPPORT_EMAIL,
  description:
    'VoiceLocal builds local-first voice dictation software for Mac with a companion Chrome extension.',
}

export const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  operatingSystem: 'macOS',
  applicationCategory: 'ProductivityApplication',
  description:
    'Local-first voice dictation for Mac with a companion Chrome extension. Speech is transcribed on-device with Whisper—no cloud upload by default.',
  url: absoluteUrl('/download'),
  image: absoluteUrl('/logo.png'),
  softwareRequirements: 'macOS 13 or later, Apple Silicon (M1/M2/M3/M4)',
  offers: {
    '@type': 'Offer',
    price: '25',
    priceCurrency: 'USD',
    description:
      'One-time lifetime license. Includes a 7-day free trial with no payment required.',
    url: absoluteUrl('/#pricing'),
  },
}
