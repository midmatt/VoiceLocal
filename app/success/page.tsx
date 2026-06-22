import Link from 'next/link'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getCustomerEmail(sessionId?: string): Promise<string | null> {
  if (!sessionId) return null
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return null
    }
    return session.customer_details?.email ?? null
  } catch (error) {
    console.error('Failed to retrieve checkout session:', error)
    return null
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const email = await getCustomerEmail(searchParams.session_id)

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="mx-auto flex w-full max-w-[480px] flex-col items-center text-center">
        <div
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full"
          style={{
            background: 'rgba(74, 222, 128, 0.12)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="#4ade80"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1
          className="mb-4 text-[2.625rem] font-bold leading-[1.1] md:text-5xl"
          style={{ color: 'var(--color-text-primary)' }}
        >
          You&apos;re all set.
        </h1>

        <p
          className="mb-8 text-base leading-[1.7] md:text-lg"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {email ? (
            <>
              Your license key is on its way to{' '}
              <span style={{ color: 'var(--color-text-primary)' }}>{email}</span>
              .
            </>
          ) : (
            <>Your license key is on its way to your email.</>
          )}
        </p>

        <Link
          href="/download"
          className="inline-flex h-[52px] w-full items-center justify-center rounded-xl bg-[#5B6EF5] px-8 text-base font-semibold text-white transition-colors hover:bg-[#4a5ce0] sm:w-auto"
        >
          Download VoiceLocal
        </Link>

        <p
          className="mt-6 text-[13px]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Check your spam folder if you don&apos;t see it within 2 minutes.
        </p>
      </div>
    </main>
  )
}
