import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — VoiceLocal',
  description:
    'Terms of Service for the VoiceLocal macOS application and Chrome extension.',
}

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), 'terms-of-service.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Terms of Service" content={content} />
}
