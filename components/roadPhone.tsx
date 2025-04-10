import { forwardRef } from "react"

export const Road = forwardRef<SVGSVGElement>((props, ref) => {
  // Position the road very close to the right edge
  const roadX = 1850
  // Increased the road width from 40 to 60 to make it wider
  const roadWidth = 60
  // Increased height for a longer road
  const roadHeight = 10000

  return (
    <svg
      ref={ref}
      width="100%"
      height="80%"
      viewBox={`0 0 1920 ${roadHeight}`}
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-full"
    >
      {/* Straight vertical road on the far right */}
      <path
        d={`M${roadX},0 L${roadX},${roadHeight}`}
        stroke="#4d4d4f"
        strokeWidth={roadWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Road markings */}
      <path
        d={`M${roadX},0 L${roadX},${roadHeight}`}
        stroke="white"
        strokeWidth="2"
        strokeDasharray="30 20"
        fill="none"
      />

      {/* Invisible path for cursor */}
      <path id="roadPath" d={`M${roadX},0 L${roadX},${roadHeight}`} stroke="transparent" strokeWidth="1" fill="none" />
    </svg>
  )
})

Road.displayName = "Road"
