export default function OurStoryWaves() {
  return (
    <svg
      viewBox="0 0 1440 900"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="osw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6f2dbd" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#6f2dbd" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {Array.from({ length: 26 }).map((_, i) => (
        <path
          key={i}
          d="M-30,420 C260,320 520,580 820,450 C1100,330 1260,240 1500,320"
          fill="none"
          stroke="url(#osw)"
          strokeWidth={1.6}
          opacity={0.10 + i * 0.02}
          transform={`translate(0, ${i * 8})`}
        />
      ))}
    </svg>
  );
}
