export default function ResourcesWaves() {
  return (
    <svg
      viewBox="0 0 1440 900"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rWave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6f2dbd" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#6f2dbd" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* multiple fine wave lines (top-right curve + center) */}
      {Array.from({ length: 26 }).map((_, i) => (
        <path
          key={i}
          d="M-40,520 C260,410 520,680 820,540 C1100,410 1230,240 1490,360"
          fill="none"
          stroke="url(#rWave)"
          strokeWidth={1.6}
          opacity={0.12 + i * 0.02}
          transform={`translate(0, ${i * 6})`}
        />
      ))}
    </svg>
  );
}
