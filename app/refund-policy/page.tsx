import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Refund Policy — VoiceLocal',
  description: 'Refund Policy for VoiceLocal paid license purchases.',
}

export default async function RefundPolicyPage() {
  const filePath = path.join(process.cwd(), 'refund-policy.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Refund Policy" content={content} />
}
