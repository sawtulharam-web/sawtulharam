export default function IslamicPattern({ className = "", opacity = 0.05 }: { className?: string, opacity?: number }) {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        opacity="1"
      >
        <defs>
          <pattern
            id="islamic-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M30 0L60 30L30 60L0 30L30 0Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M15 15L45 45M15 45L45 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <rect
              x="15"
              y="15"
              width="30"
              height="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
      </svg>
    </div>
  );
}
