import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/privacy',
  title: 'Privacy Policy',
  description:
    'How VoiceLocal handles your data. Speech is transcribed on your Mac by default—audio and transcripts are not sent to our servers during normal use.',
})

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), 'privacy-policy.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Privacy Policy" content={content} />
}
