import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  path: '/refund-policy',
  title: 'Refund Policy',
  description:
    'VoiceLocal refund policy for paid licenses. All sales are final; review billing-error contact steps and how the free trial helps you evaluate before purchase.',
})

export default async function RefundPolicyPage() {
  const filePath = path.join(process.cwd(), 'refund-policy.md')
  const content = await fs.readFile(filePath, 'utf-8')

  return <LegalPage title="Refund Policy" content={content} />
}
