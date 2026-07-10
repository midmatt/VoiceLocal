import Link from 'next/link'
import Image from 'next/image'
import { marked } from 'marked'

export default function LegalPage({
  title,
  content,
}: {
  title: string
  content: string
}) {
  const html = marked.parse(content, { gfm: true, async: false }) as string

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          height: '64px',
          background: 'rgba(8, 8, 16, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/logo.png"
            alt="VoiceLocal logo"
            width={28}
            height={28}
            style={{ height: '28px', width: 'auto' }}
          />
          <span
            style={{ color: '#e8e8f4', fontWeight: 600, fontSize: '16px' }}
          >
            VoiceLocal
          </span>
        </Link>
      </nav>

      <main
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        <article className="legal-content mx-auto max-w-[720px] px-6">
          <h1
            className="mb-10 text-[2rem] font-bold md:text-[2.5rem]"
            style={{ color: '#e8e8f4' }}
          >
            {title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
    </>
  )
}
