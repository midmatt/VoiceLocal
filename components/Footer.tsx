export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-10"
      style={{
        borderColor: 'rgba(91, 110, 245, 0.12)',
        background: 'var(--color-background)',
      }}
    >
      <div
        className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-4 text-sm md:flex-row"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <p>© 2025 VoiceLocal</p>
        <p className="text-center" style={{ color: 'var(--color-text-secondary)' }}>
          Footer placeholder — Privacy Policy, Terms, hello@voicelocalapp.com
        </p>
      </div>
    </footer>
  )
}
