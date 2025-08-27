import React from "react";

const PhoneMockup = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 425 762"
      preserveAspectRatio="none"
      className={`block ${className}`}
      {...props}
    >
      <defs>
        {/* Phone shadow */}
        <filter id="phoneShadow">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="8"
            floodColor="rgba(0,0,0,0.1)"
          />
        </filter>

        {/* Card shadow */}
        <filter id="cardShadow">
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="rgba(0,0,0, 0.26)"
          />
        </filter>
      </defs>

      {/* Phone outer frame */}
      <rect
        x="0"
        y="0"
        width="425"
        height="762"
        rx="45"
        ry="45"
        fill="#000000"
      />

      {/* Phone inner screen */}
      <rect
        x="8"
        y="8"
        width="409"
        height="746"
        rx="37"
        ry="37"
        fill="#f8f9fa"
      />

      {/* Status bar */}
      <g transform="translate(28, 48)">
        {/* Time */}
        <text
          x="0"
          y="0"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fontWeight="600"
          fill="#000000"
        >
          50
        </text>

        {/* WiFi icon - FIXED ALIGNMENT */}
        <g transform="translate(290, -12)">
          <path
            d="M0 8 C0 8 5 0 15 0 S30 8 30 8 L25 12 C25 12 20 6 15 6 S5 12 5 12 Z"
            fill="#000000"
          />
          <path
            d="M8 12 C8 12 11 9 15 9 S22 12 22 12 L19 15 C19 15 17 13 15 13 S11 15 11 15 Z"
            fill="#000000"
          />
          <circle cx="15" cy="18" r="2" fill="#000000" />
        </g>

        {/* Battery icon - FIXED ALIGNMENT */}
        <g transform="translate(335, -9)">
          <rect
            x="0"
            y="0"
            width="24"
            height="12"
            rx="2"
            ry="2"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
          />
          <rect
            x="24"
            y="3"
            width="2"
            height="6"
            rx="1"
            ry="1"
            fill="#000000"
          />
          <rect
            x="2"
            y="2"
            width="16"
            height="8"
            rx="1"
            ry="1"
            fill="#000000"
          />
        </g>
      </g>

      {/* App title */}
      <text
        x="211.5"
        y="150"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="54"
        fontWeight="600"
        fill="#000000"
        textAnchor="middle"
      >
        Todo
      </text>

      {/* Todo items container */}
      <g transform="translate(28, 198)">
        {/* Todo item 1 */}
        <rect
          x="0"
          y="0"
          width="369"
          height="60"
          rx="12"
          ry="12"
          fill="#ffffff"
          filter="url(#cardShadow)"
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="none"
          stroke="#666666"
          strokeWidth="2"
        />
        <text
          x="55"
          y="37"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fill="#333333"
        >
          Buy groceries
        </text>

        {/* Todo item 2 */}
        <rect
          x="0"
          y="75"
          width="369"
          height="60"
          rx="12"
          ry="12"
          fill="#ffffff"
          filter="url(#cardShadow)"
        />
        <circle
          cx="30"
          cy="105"
          r="8"
          fill="none"
          stroke="#666666"
          strokeWidth="2"
        />
        <text
          x="55"
          y="112"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fill="#333333"
        >
          Wur prohents
        </text>

        {/* Todo item 3 */}
        <rect
          x="0"
          y="150"
          width="369"
          height="60"
          rx="12"
          ry="12"
          fill="#ffffff"
          filter="url(#cardShadow)"
        />
        <circle
          cx="30"
          cy="180"
          r="8"
          fill="none"
          stroke="#666666"
          strokeWidth="2"
        />
        <text
          x="55"
          y="187"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fill="#333333"
        >
          Rath your stleo
        </text>

        {/* Todo item 4 */}
        <rect
          x="0"
          y="225"
          width="369"
          height="60"
          rx="12"
          ry="12"
          fill="#ffffff"
          filter="url(#cardShadow)"
        />
        <circle
          cx="30"
          cy="255"
          r="8"
          fill="none"
          stroke="#666666"
          strokeWidth="2"
        />
        <text
          x="55"
          y="262"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="22"
          fill="#333333"
        >
          Call paciner
        </text>

        {/* Add Task button */}
        <rect
          x="0"
          y="310"
          width="369"
          height="60"
          rx="12"
          ry="12"
          fill="#f8f9fa"
          stroke="#e9ecef"
          strokeWidth="2"
          filter="url(#cardShadow)"
        />
        <g transform="translate(30, 340)">
          <line
            x1="0"
            y1="0"
            x2="16"
            y2="0"
            stroke="#666666"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="-8"
            x2="8"
            y2="8"
            stroke="#666666"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
        <text
          x="65"
          y="347"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="24"
          fill="#666666"
        >
          Add Task
        </text>
      </g>
    </svg>
  );
};

export default PhoneMockup;
