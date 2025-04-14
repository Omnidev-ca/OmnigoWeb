"use client"

import { useEffect, useRef } from "react"

export default function TechWallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create a hexagonal pattern of triangles
    const triangles: Triangle[] = generateHexagonalPattern(canvas.width, canvas.height)

    // Create paths for light beams
    const paths: Path[] = generatePaths(triangles, 15, 10) // 15 paths with max 10 edges each

    // Animation loop
    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw triangles
      triangles.forEach((triangle) => {
        drawTriangle(ctx, triangle)
      })

      // Draw light beams
      paths.forEach((path, index) => {
        // Offset each path's animation
        const pathOffset = index * 0.5
        drawLightBeam(ctx, path, time + pathOffset)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full bg-white" />
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

interface Path {
  edges: Edge[]
  color: string
  width: number
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

  // Colors for the triangles - light colors for white background
  const colors = [
    "rgba(240, 240, 245, 0.7)", // Very light blue-gray
    "rgba(235, 235, 240, 0.7)", // Light gray
    "rgba(245, 245, 250, 0.7)", // Almost white
  ]

  const borderColor = "rgba(180, 180, 190, 0.5)" // Medium gray border

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

function generatePaths(triangles: Triangle[], numPaths: number, maxEdgesPerPath: number): Path[] {
  const paths: Path[] = []
  const allEdges: Edge[] = []

  // Collect all edges
  triangles.forEach((triangle) => {
    allEdges.push(...triangle.edges)
  })

  // Colors for the light beams
  const beamColors = [
    "rgba(125,249,255,255)",
    "rgba(80,200,232,255)",
    "rgba(80,200,232,255)",
    "rgba(77,77,79,255)",
    //"rgba(13,24,33,255)",
  ]

  // Create paths
  for (let i = 0; i < numPaths; i++) {
    // Start with a random edge
    const startEdgeIndex = Math.floor(Math.random() * allEdges.length)
    const startEdge = allEdges[startEdgeIndex]

    const pathEdges: Edge[] = [startEdge]
    let currentEdge = startEdge

    // Add more edges to the path
    for (let j = 0; j < maxEdgesPerPath - 1; j++) {
      // Find edges that connect to the current edge's end point
      const connectedEdges = allEdges.filter(
        (edge) =>
          Math.abs(edge.start.x - currentEdge.end.x) < 0.1 &&
          Math.abs(edge.start.y - currentEdge.end.y) < 0.1 &&
          edge.triangleIndex !== currentEdge.triangleIndex,
      )

      if (connectedEdges.length === 0) break

      // Choose a random connected edge
      const nextEdge = connectedEdges[Math.floor(Math.random() * connectedEdges.length)]
      pathEdges.push(nextEdge)
      currentEdge = nextEdge
    }

    paths.push({
      edges: pathEdges,
      color: beamColors[Math.floor(Math.random() * beamColors.length)],
      width: 2 + 0.1 * 2,
    })
  }

  return paths
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

function drawLightBeam(ctx: CanvasRenderingContext2D, path: Path, time: number) {
  if (path.edges.length === 0) return

  // Calculate the total length of the path
  let totalLength = 0
  path.edges.forEach((edge) => {
    const dx = edge.end.x - edge.start.x
    const dy = edge.end.y - edge.start.y
    totalLength += Math.sqrt(dx * dx + dy * dy)
  })

  // Parameters for the light beam
  const beamLength = totalLength * 0.3 // Beam covers 30% of the path
  const beamPosition = ((time % 2) / 2) * (totalLength + beamLength) - beamLength

  // Draw the beam
  let currentLength = 0

  for (let i = 0; i < path.edges.length; i++) {
    const edge = path.edges[i]
    const dx = edge.end.x - edge.start.x
    const dy = edge.end.y - edge.start.y
    const edgeLength = Math.sqrt(dx * dx + dy * dy)

    // Check if this edge intersects with the beam
    const edgeStart = currentLength
    const edgeEnd = currentLength + edgeLength

    if (beamPosition < edgeEnd && beamPosition + beamLength > edgeStart) {
      // Calculate the visible portion of this edge
      const visibleStart = Math.max(0, beamPosition - edgeStart)
      const visibleEnd = Math.min(edgeLength, beamPosition + beamLength - edgeStart)

      // Calculate the start and end points of the visible portion
      const startRatio = visibleStart / edgeLength
      const endRatio = visibleEnd / edgeLength

      const visibleStartX = edge.start.x + dx * startRatio
      const visibleStartY = edge.start.y + dy * startRatio
      const visibleEndX = edge.start.x + dx * endRatio
      const visibleEndY = edge.start.y + dy * endRatio

      // Draw the visible portion with glow effect
      // Outer glow
      ctx.beginPath()
      ctx.moveTo(visibleStartX, visibleStartY)
      ctx.lineTo(visibleEndX, visibleEndY)
      ctx.strokeStyle = path.color.replace("0.9", "0.3")
      ctx.lineWidth = path.width * 3
      ctx.lineCap = "round"
      ctx.stroke()

      // Inner beam
      ctx.beginPath()
      ctx.moveTo(visibleStartX, visibleStartY)
      ctx.lineTo(visibleEndX, visibleEndY)
      ctx.strokeStyle = path.color
      ctx.lineWidth = path.width
      ctx.lineCap = "round"
      ctx.stroke()
    }

    currentLength += edgeLength
  }
}
