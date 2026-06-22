const bars = [
  { maxH: 20, duration: 1.1, delay: 0 },
  { maxH: 35, duration: 0.9, delay: 0.15 },
  { maxH: 28, duration: 1.3, delay: 0.05 },
  { maxH: 44, duration: 0.8, delay: 0.25 },
  { maxH: 32, duration: 1.0, delay: 0.1 },
  { maxH: 48, duration: 0.7, delay: 0.3 },
  { maxH: 22, duration: 1.2, delay: 0.0 },
  { maxH: 38, duration: 0.95, delay: 0.2 },
  { maxH: 16, duration: 1.15, delay: 0.08 },
  { maxH: 42, duration: 0.85, delay: 0.18 },
  { maxH: 26, duration: 1.05, delay: 0.12 },
] as const

export default function WaveformAnimation() {
  return (
    <div className="waveform-container">
      {bars.map((bar, index) => (
        <div
          key={index}
          className="waveform-bar"
          style={{
            height: `${bar.maxH}px`,
            animation: `voicebar ${bar.duration}s ease-in-out ${bar.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}
