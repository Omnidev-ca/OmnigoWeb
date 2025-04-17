"use client"

import { useEffect, useRef } from "react"

export default function TechWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to hero section size
    const resizeCanvas = () => {
      const heroSection = document.querySelector('section[class*="h-[90vh]"]')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create a hexagonal pattern of triangles
    const triangles: Triangle[] = generateHexagonalPattern(canvas.width, canvas.height)

    // Draw triangles
    triangles.forEach((triangle) => {
      drawTriangle(ctx, triangle)
    })

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-[90vh] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-[90vh] pointer-events-none" 
        style={{ 
          background: 'transparent',
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
        }} 
      />
    </div>
  )
}

// Types
interface Point {
  x: number
  y: number
}

interface Triangle {
  points: [Point, Point, Point]
  color: string
  borderColor: string
  edges: Edge[]
}

interface Edge {
  start: Point
  end: Point
  triangleIndex: number
}

// Helper functions
function generateHexagonalPattern(width: number, height: number): Triangle[] {
  const triangles: Triangle[] = []

  // Hexagon parameters
  const hexSize = 100 // Size of hexagon
  const hexWidth = hexSize * 2
  const hexHeight = Math.sqrt(3) * hexSize

  // Calculate number of hexagons needed to cover the canvas
  const cols = Math.ceil(width / (hexWidth * 0.75)) + 1
  const rows = Math.ceil(height / hexHeight) + 1

  // Offset for centering
  const offsetX = (width - cols * hexWidth * 0.75) / 2
  const offsetY = (height - rows * hexHeight) / 2

  // Colors for the triangles
  const colors = [
    "rgba(125, 249, 255, 0.3)", // Light cyan
    "rgba(125, 249, 255, 0.2)", // Lighter cyan
    "rgba(125, 249, 255, 0.4)", // Slightly darker cyan
  ]

  const borderColor = "rgba(125, 249, 255, 0.5)" // Cyan border

  // Generate hexagonal grid
  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      // Calculate center of this hexagon
      const centerX = offsetX + col * hexWidth * 0.75
      const centerY = offsetY + row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2)

      // Create 6 triangles to form a hexagon
      for (let i = 0; i < 6; i++) {
        const angle1 = (Math.PI / 3) * i
        const angle2 = (Math.PI / 3) * ((i + 1) % 6)

        const x1 = centerX
        const y1 = centerY
        const x2 = centerX + hexSize * Math.cos(angle1)
        const y2 = centerY + hexSize * Math.sin(angle1)
        const x3 = centerX + hexSize * Math.cos(angle2)
        const y3 = centerY + hexSize * Math.sin(angle2)

        const points: [Point, Point, Point] = [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
          { x: x3, y: y3 },
        ]

        // Create edges for this triangle
        const edges: Edge[] = [
          { start: points[0], end: points[1], triangleIndex: triangles.length },
          { start: points[1], end: points[2], triangleIndex: triangles.length },
          { start: points[2], end: points[0], triangleIndex: triangles.length },
        ]

        triangles.push({
          points,
          color: colors[Math.floor(Math.random() * colors.length)],
          borderColor: borderColor,
          edges,
        })
      }
    }
  }

  return triangles
}

function drawTriangle(ctx: CanvasRenderingContext2D, triangle: Triangle) {
  const { points, color, borderColor } = triangle

  // Fill triangle
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  ctx.lineTo(points[1].x, points[1].y)
  ctx.lineTo(points[2].x, points[2].y)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()

  // Draw border
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  ctx.lineTo(points[1].x, points[1].y)
  ctx.lineTo(points[2].x, points[2].y)
  ctx.closePath()
  ctx.strokeStyle = borderColor
  ctx.lineWidth = 1
  ctx.stroke()
}
