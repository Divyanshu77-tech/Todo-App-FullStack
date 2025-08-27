import React from "react";

const LandingNavLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 80"
      width="300"
      height="80"
      className="rounded-xl"
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#2d2d2d", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#1a1a1a", stopOpacity: 1 }}
          />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Logo icon */}
      <g transform="translate(30, 20)">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="url(#iconGradient)"
          strokeWidth="2.5"
          filter="url(#glow)"
          opacity="0.9"
        />
        <path
          d="M12 20 L17 25 L28 14"
          fill="none"
          stroke="#2d2d2d"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />
        <circle cx="20" cy="20" r="2" fill="#64ffda" opacity="0.6" />
      </g>

      {/* App name */}
      <text
        x="85"
        y="35"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="600"
        fill="#2d2d2d"
        opacity="0.95"
      >
        TaskFlow
      </text>

      {/* Tagline */}
      <text
        x="85"
        y="52"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="11"
        fontWeight="400"
        fill="#666666"
        opacity="0.8"
        letterSpacing="0.5px"
      >
        SIMPLE • ELEGANT • PRODUCTIVE
      </text>

      {/* Accent dots */}
      <g transform="translate(250, 15)" opacity="0.3">
        <circle cx="0" cy="0" r="3" fill="#64ffda" />
        <circle cx="15" cy="10" r="2" fill="#ffffff" />
        <circle cx="8" cy="25" r="1.5" fill="#64ffda" />
      </g>
    </svg>
  );
};

export default LandingNavLogo;
