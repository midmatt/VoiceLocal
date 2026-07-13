'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SUPPORT_EMAIL } from '@/lib/seo'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#080810',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '48px 0 0',
      }}
    >
      <div
        className="mx-auto max-w-[1100px] px-6"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '40px',
        }}
      >
        {/* Mobile: stack, Desktop: 3 columns */}
        <div
          className="grid gap-10 md:grid-cols-3"
        >
          {/* Left: Logo + tagline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Image
                src="/logo.png"
                alt="VoiceLocal logo"
                width={32}
                height={32}
                style={{ height: '32px', width: 'auto' }}
              />
              <span style={{ color: '#e8e8f4', fontWeight: 600, fontSize: '16px' }}>
                VoiceLocal
              </span>
            </div>
            <p style={{ color: '#4a4a6a', fontSize: '14px' }}>
              Private voice dictation for Mac.
            </p>
          </div>

          {/* Center: Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Download', href: '/download' },
              { label: 'Buy Now', href: '/#pricing' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Refund Policy', href: '/refund-policy' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200"
                style={{ color: '#8b8fb8', fontSize: '14px', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8f4' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#8b8fb8' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact */}
          <div className="md:text-right">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="transition-colors duration-200"
              style={{ color: '#8b8fb8', fontSize: '14px', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#e8e8f4' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#8b8fb8' }}
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div
        className="mx-auto max-w-[1100px] px-6"
        style={{
          marginTop: '40px',
          paddingTop: '20px',
          paddingBottom: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <p style={{ color: '#4a4a6a', fontSize: '13px' }}>
          &copy; 2025 VoiceLocal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
