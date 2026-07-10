import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — VoiceLocal',
  description:
    'Privacy Policy for the VoiceLocal macOS application and Chrome extension.',
}

export default async function PrivacyPage() {
  const filePath = path.join(process.cwd(), 'privacy-policy.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Privacy Policy" content={content} />
}
