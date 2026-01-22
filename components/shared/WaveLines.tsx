export default function WaveLines() {
  return (
    <svg
      viewBox="0 0 1440 520"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* Stronger / darker purple stroke */}
        <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5B1FA3" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#6F2DBD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#5B1FA3" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Figma-like multiple tight lines */}
      {Array.from({ length: 30 }).map((_, i) => (
        <path
          key={i}
          d="M-60,280 C220,170 520,360 780,290 C1060,210 1220,120 1500,220"
          fill="none"
          stroke="url(#waveStroke)"
          strokeWidth={1.6}
          opacity={0.26 + i * 0.015}   // ✅ darker overall
          transform={`translate(0, ${i * 4})`}
        />
      ))}
    </svg>
  );
}
