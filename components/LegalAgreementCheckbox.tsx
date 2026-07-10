import type { ReactNode } from 'react'

const linkStyle = { color: '#5B6EF5' } as const

function LegalLink({
  href,
  children,
}: {
  href: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2"
      style={linkStyle}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  )
}

export function TrialAgreementCheckbox({
  id,
  checked,
  onChange,
  className = '',
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[rgba(91,110,245,0.4)] bg-transparent accent-[#5B6EF5]"
      />
      <span className="text-[13px] leading-relaxed" style={{ color: '#8b8fb8' }}>
        I agree to the{' '}
        <LegalLink href="/terms">Terms of Service</LegalLink> and{' '}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>
      </span>
    </label>
  )
}

export function PurchaseAgreementCheckbox({
  id,
  checked,
  onChange,
  className = '',
}: {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 ${className}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[rgba(91,110,245,0.4)] bg-transparent accent-[#5B6EF5]"
      />
      <span className="text-[13px] leading-relaxed" style={{ color: '#8b8fb8' }}>
        I agree to the{' '}
        <LegalLink href="/terms">Terms of Service</LegalLink>,{' '}
        <LegalLink href="/privacy">Privacy Policy</LegalLink>, and{' '}
        <LegalLink href="/refund-policy">Refund Policy</LegalLink>
      </span>
    </label>
  )
}
