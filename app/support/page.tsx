import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/support',
  title: 'Support',
  description:
    'Get help with VoiceLocal. Email support@voicelocalapp.com for the Mac app or Chrome extension, plus quick fixes for permissions and connection issues.',
})

export default async function SupportPage() {
  const filePath = path.join(process.cwd(), 'support.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Support" content={content} />
}
