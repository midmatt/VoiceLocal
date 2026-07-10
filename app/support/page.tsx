import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Support — VoiceLocal',
  description: 'Get help with VoiceLocal. Contact support or try these quick fixes.',
}

export default async function SupportPage() {
  const filePath = path.join(process.cwd(), 'support.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Support" content={content} />
}
