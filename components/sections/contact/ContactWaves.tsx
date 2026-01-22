export default function ContactWaves() {
  return (
    <svg
      viewBox="0 0 1440 900"
      className="h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cw" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6f2dbd" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#6f2dbd" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {Array.from({ length: 24 }).map((_, i) => (
        <path
          key={i}
          d="M760,200 C980,110 1180,310 1460,220"
          fill="none"
          stroke="url(#cw)"
          strokeWidth={1.6}
          opacity={0.10 + i * 0.02}
          transform={`translate(0, ${i * 10})`}
        />
      ))}
    </svg>
  );
}
