'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080810',
        color: '#e8e8f4',
        padding: '24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>
          Something went wrong
        </h1>
        <p style={{ color: '#8b8fb8', marginBottom: '24px', lineHeight: 1.6 }}>
          The page failed to load. If you recently changed dependencies or routes,
          stop the dev server, run{' '}
          <code style={{ color: '#e8e8f4' }}>rm -rf .next</code>, and start it
          again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            background: '#5B6EF5',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Try again
        </button>
      </div>
    </main>
  )
}
