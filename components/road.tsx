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

      {/* Key points along the road */}
      <circle cx="960" cy="150" r="8" fill="#7DF9FF" />
      <circle cx="960" cy="1150" r="8" fill="#7DF9FF" />
      <circle cx="960" cy="2150" r="8" fill="#7DF9FF" />
      <circle cx="960" cy="3150" r="8" fill="#7DF9FF" />
      <circle cx="960" cy="4150" r="8" fill="#7DF9FF" />

      {/* Scenery elements */}
      <circle cx="700" cy="800" r="50" fill="#7DF9FF" opacity="0.3" />
      <circle cx="1200" cy="1500" r="70" fill="#7DF9FF" opacity="0.2" />
      <circle cx="800" cy="2200" r="40" fill="#7DF9FF" opacity="0.3" />
      <circle cx="1100" cy="3000" r="60" fill="#7DF9FF" opacity="0.2" />
      <circle cx="750" cy="3800" r="55" fill="#7DF9FF" opacity="0.3" />
      <circle cx="1150" cy="4500" r="45" fill="#7DF9FF" opacity="0.2" />

      {/* Additional road elements */}
      <rect x="1050" y="700" width="100" height="30" rx="5" fill="#4d4d4f" opacity="0.7" />
      <rect x="750" y="1800" width="120" height="30" rx="5" fill="#4d4d4f" opacity="0.7" />
      <rect x="1100" y="2700" width="80" height="30" rx="5" fill="#4d4d4f" opacity="0.7" />
      <rect x="800" y="3500" width="110" height="30" rx="5" fill="#4d4d4f" opacity="0.7" />
      <rect x="1000" y="4300" width="90" height="30" rx="5" fill="#4d4d4f" opacity="0.7" />
    </svg>
  )
})

Road.displayName = "Road"
