import React from 'react';
//generated using loading.io
const Ripple = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="100"
      height="100"
      className='translate-y-[40vh] translate-x-[45vw]'
      style={{
        shapeRendering: 'auto',
        display: 'block',
        background: 'transparent',
      }}
    >
      <g>
        <circle
          strokeWidth="4"
          stroke="#a974ff"
          fill="none"
          r="0"
          cy="50"
          cx="50"
        >
          <animate
            begin="0s"
            calcMode="spline"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            values="0;40"
            dur="1.538s"
            repeatCount="indefinite"
            attributeName="r"
          />
          <animate
            begin="0s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            values="1;0"
            dur="1.538s"
            repeatCount="indefinite"
            attributeName="opacity"
          />
        </circle>
        <circle
          strokeWidth="4"
          stroke="#a974ff"
          fill="none"
          r="0"
          cy="50"
          cx="50"
        >
          <animate
            begin="-0.769s"
            calcMode="spline"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            values="0;40"
            dur="1.538s"
            repeatCount="indefinite"
            attributeName="r"
          />
          <animate
            begin="-0.769s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            values="1;0"
            dur="1.538s"
            repeatCount="indefinite"
            attributeName="opacity"
          />
        </circle>
      </g>
    </svg>
  );
};

export default Ripple;
