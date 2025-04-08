import { forwardRef } from "react"

export const Road = forwardRef<SVGSVGElement>((props, ref) => {
  return (
    <svg
      ref={ref}
      width="100%"
      height="100%"
      viewBox="0 0 1920 5000"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-full"
    >
      {/* Road background */}
      <rect width="100%" height="100%" fill="#f8f8f8" />

      {/* Vertical Road with curves that passes through content sections */}
      <path
        d="M960,0 C1200,500 700,1000 960,1500 C1200,2000 700,2500 960,3000 C1200,3500 700,4000 960,4500 C1100,4800 900,5000 960,5000"
        stroke="#4d4d4f"
        strokeWidth="40"
        fill="none"
      />

      {/* Road markings */}
      <path
        d="M960,0 C1200,500 700,1000 960,1500 C1200,2000 700,2500 960,3000 C1200,3500 700,4000 960,4500 C1100,4800 900,5000 960,5000"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="30 20"
        fill="none"
      />

      {/* Invisible path for the car to follow */}
      <path
        id="roadPath"
        d="M960,0 C1200,500 700,1000 960,1500 C1200,2000 700,2500 960,3000 C1200,3500 700,4000 960,4500 C1100,4800 900,5000 960,5000"
        stroke="transparent"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
})

Road.displayName = "Road"
