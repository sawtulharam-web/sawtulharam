import { motion } from 'framer-motion';

export default function IslamicPattern({
  className = '',
  opacity = 0.1,
  animate = false,
}: {
  className?: string;
  opacity?: number;
  animate?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <motion.div
        animate={
          animate
            ? {
                rotate: [0, 360],
              }
            : undefined
        }
        transition={{
          duration: 180,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-full h-full"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="islamic-girih-pattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer 8-Point Star Geometry */}
              <path
                d="M40 0 L51.7 11.7 L68.3 11.7 L68.3 28.3 L80 40 L68.3 51.7 L68.3 68.3 L51.7 68.3 L40 80 L28.3 68.3 L11.7 68.3 L11.7 51.7 L0 40 L11.7 28.3 L11.7 11.7 L28.3 11.7 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              {/* Inner Square Rotate 45deg */}
              <path
                d="M40 10 L70 40 L40 70 L10 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              {/* Concentric Center Octagon */}
              <circle
                cx="40"
                cy="40"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* Diagonals */}
              <line x1="0" y1="0" x2="80" y2="80" stroke="currentColor" strokeWidth="0.5" />
              <line x1="80" y1="0" x2="0" y2="80" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-girih-pattern)" />
        </svg>
      </motion.div>
    </div>
  );
}
