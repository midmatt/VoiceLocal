import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/terms',
  title: 'Terms of Service',
  description:
    'VoiceLocal Terms of Service for the macOS app and Chrome extension, covering licensing, acceptable use, macOS permissions, payments, and third-party services.',
})

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), 'terms-of-service.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Terms of Service" content={content} />
}
