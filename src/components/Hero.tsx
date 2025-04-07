'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Grid, RoundedBox, Edges, Line } from '@react-three/drei';
import { Mesh } from 'three';

// Define the structure for square configuration
interface SquareConfig {
  position: [number, number]; // x, z coordinates
  size: [number, number];     // width, depth in grid units
  color: string;              
  highlightColor: string;     // For future use
  name: string;               // For future use
  description: string;        // Building description
  category: string;           // Building category
  status: string;             // Building status
}

// JSON configuration for predefined squares
const SQUARES_CONFIG: SquareConfig[] = [
  {
    position: [0, 0],
    size: [2, 2],           // 4x4 grid cells, centered at 0,0 (double the previous size)
    color: "white",
    highlightColor: "#d84315",
    name: "Center Square",
    description: "Main headquarters building with central operations",
    category: "Administrative",
    status: "Operational"
  },
  {
    position: [4, 4],
    size: [2, 1],           // 2x2 grid cell at position 4,4 (double the previous size)
    color: "white",
    highlightColor: "#2e7d32",
    name: "Green Square",
    description: "Environmental research facility with vertical gardens",
    category: "Research",
    status: "Under Construction"
  },
  {
    position: [-4, -3],
    size: [2, 2],           // 6x2 grid cells, a larger rectangular shape
    color: "white",
    highlightColor: "#6a1b9a",
    name: "Purple Rectangle",
    description: "Quantum computing lab with advanced cooling systems",
    category: "Technology",
    status: "Experimental"
  }
];

// Custom lines representing the edges of a box
function BoxLines({ width, height, depth, color, scale = 1 }: { width: number, height: number, depth: number, color: string, scale?: number }) {
  const lineRef = useRef(null);
  
  // Create the corners of the box
  const halfW = (width * scale) / 2;
  const halfH = (height * scale) / 2;
  const halfD = (depth * scale) / 2;
  
  // 8 corners of a cube - using proper [x,y,z] tuples
  const points: [number, number, number][] = [
    // Bottom face
    [-halfW, -halfH, -halfD], [halfW, -halfH, -halfD],
    [halfW, -halfH, -halfD], [halfW, -halfH, halfD],
    [halfW, -halfH, halfD], [-halfW, -halfH, halfD],
    [-halfW, -halfH, halfD], [-halfW, -halfH, -halfD],
    
    // Top face
    [-halfW, halfH, -halfD], [halfW, halfH, -halfD],
    [halfW, halfH, -halfD], [halfW, halfH, halfD],
    [halfW, halfH, halfD], [-halfW, halfH, halfD],
    [-halfW, halfH, halfD], [-halfW, halfH, -halfD],
    
    // Vertical edges
    [-halfW, -halfH, -halfD], [-halfW, halfH, -halfD],
    [halfW, -halfH, -halfD], [halfW, halfH, -halfD],
    [halfW, -halfH, halfD], [halfW, halfH, halfD],
    [-halfW, -halfH, halfD], [-halfW, halfH, halfD],
  ];
  
  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={3}
      segments
    />
  );
}

// Animated Edges component for the pulsing edge effect
function AnimatedEdges({ color, scale, hovered, width, height, depth }: { 
  color: string, 
  scale: number, 
  hovered: boolean,
  width: number,
  height: number,
  depth: number
}) {
  const [edgeScale, setEdgeScale] = useState(scale);
  const [glowIntensity, setGlowIntensity] = useState(hovered ? 0.8 : 0);
  
  // Animate edge properties when hovered
  useFrame(({ clock }) => {
    if (hovered) {
      // Create a pulsing animation effect for the edges
      const pulse = Math.sin(clock.getElapsedTime() * 5) * 0.5 + 0.5; // Values between 0 and 1
      setEdgeScale(scale + (pulse * 0.1)); // More pronounced scale pulsing
      setGlowIntensity(0.6 + pulse * 0.8); // Glowing intensity variation
    } else {
      // Reset to normal when not hovered
      setEdgeScale(scale);
      setGlowIntensity(0);
    }
  });
  
  return (
    <>
      {/* Standard edges for non-hover state */}
      {!hovered && <Edges color={color} scale={scale} threshold={15} visible={true} />}
      
      {/* Custom animated edges for hover state */}
      {hovered && (
        <group>
          {/* Glow effect */}
          <mesh>
            <sphereGeometry args={[Math.max(width, depth) * 0.7, 16, 16]} />
            <meshBasicMaterial 
              color="#7DF9FF" 
              transparent={true} 
              opacity={glowIntensity * 0.2} 
              wireframe={true}
            />
          </mesh>
          
          {/* Animated box lines */}
          <BoxLines 
            width={width} 
            height={height} 
            depth={depth} 
            color="#7DF9FF"
            scale={edgeScale} 
          />
        </group>
      )}
    </>
  );
}

// Utility constants and functions
const CELL_SIZE = 0.5; // Size of one grid cell

// Convert grid coordinates to world coordinates
// In our grid system:
// - Grid lines are at integer coordinates
// - Grid cells are centered between grid lines
function gridToWorld(gridX: number, gridZ: number): [number, number] {
  return [gridX * CELL_SIZE, gridZ * CELL_SIZE];
}

// Info Bubble component to display building information
function InfoBubble({ config, position, onClose }: { 
  config: SquareConfig, 
  position: { x: number, y: number },
  onClose: () => void
}) {
  return (
    <div 
      className="absolute bg-black bg-opacity-80 text-white p-4 rounded-lg shadow-lg border border-cyan-400"
      style={{ 
        left: position.x, 
        top: position.y, 
        maxWidth: '300px',
        transform: 'translate(-50%, -100%)',
        zIndex: 1000
      }}
    >
      <button 
        className="absolute top-2 right-2 text-cyan-400 hover:text-white"
        onClick={onClose}
      >
        ✕
      </button>
      <h3 className="text-lg font-bold text-cyan-400 mb-2">{config.name}</h3>
      <div className="mb-2">
        <span className="text-cyan-400 text-sm mr-2">Category:</span>
        <span>{config.category}</span>
      </div>
      <div className="mb-2">
        <span className="text-cyan-400 text-sm mr-2">Status:</span>
        <span>{config.status}</span>
      </div>
      <div className="mb-2">
        <span className="text-cyan-400 text-sm mr-2">Description:</span>
        <p className="text-sm">{config.description}</p>
      </div>
    </div>
  );
}

// Custom animated path following grid lines
function GridPath({ 
  from, 
  to, 
  color = "#4CAF50",
  thickness = 0.15,
  gridHeight = 0.01
}: { 
  from: [number, number], 
  to: [number, number],
  color?: string,
  thickness?: number,
  gridHeight?: number
}) {
  const [progress, setProgress] = useState(0);
  const prevPosition = useRef<[number, number] | null>(null);
  
  // Reset animation when destination changes
  useEffect(() => {
    if (
      !prevPosition.current || 
      prevPosition.current[0] !== to[0] || 
      prevPosition.current[1] !== to[1]
    ) {
      setProgress(0);
      prevPosition.current = to;
    }
  }, [to]);
  
  // Animate progress
  useFrame((_, delta) => {
    setProgress(prev => Math.min(prev + delta * 2, 1)); // Complete in ~0.5 seconds
  });
  
  // Ensure valid coordinates (using input grid coordinates)
  const fromGridX = Number(from[0]) || 0;
  const fromGridZ = Number(from[1]) || 0;
  const toGridX = Number(to[0]) || 0;
  const toGridZ = Number(to[1]) || 0;
  
  // Don't render if path has no length or contains invalid values
  if (!isFinite(fromGridX) || !isFinite(fromGridZ) || !isFinite(toGridX) || !isFinite(toGridZ)) {
    return null;
  }
  
  // Convert grid coordinates to world coordinates
  const [fromX, fromZ] = gridToWorld(fromGridX, fromGridZ);
  const [toX, toZ] = gridToWorld(toGridX, toGridZ);
  
  // Create fixed coordinates for the complete path
  const start: [number, number, number] = [fromX, gridHeight, fromZ];
  const corner: [number, number, number] = [toX, gridHeight, fromZ];
  
  // Calculate path segments lengths (in world units)
  const horizontalLength = Math.abs(toX - fromX);
  const verticalLength = Math.abs(toZ - fromZ);
  const totalLength = horizontalLength + verticalLength;
  
  // Calculate progress values
  const visibleLength = totalLength * progress;
  const completedHorizontal = visibleLength >= horizontalLength;
  
  // Render two separate lines for better control
  return (
    <>
      {/* Horizontal segment */}
      {horizontalLength > 0 && (
        <mesh position={[0, 0, 0]}>
          <Line
            points={[
              start,
              // If horizontal segment is complete, use full length, otherwise partial
              completedHorizontal 
                ? corner 
                : [fromX + (Math.sign(toX - fromX) * visibleLength), gridHeight, fromZ] as [number, number, number]
            ]}
            color={color}
            lineWidth={thickness * 30}
          />
        </mesh>
      )}
      
      {/* Vertical segment (only if horizontal is complete) */}
      {completedHorizontal && verticalLength > 0 && (
        <mesh position={[0, 0, 0]}>
          <Line
            points={[
              corner,
              // Calculate how far along the vertical segment we are
              [
                toX, 
                gridHeight, 
                fromZ + (Math.sign(toZ - fromZ) * Math.min(visibleLength - horizontalLength, verticalLength))
              ] as [number, number, number]
            ]}
            color={color}
            lineWidth={thickness * 30}
          />
        </mesh>
      )}
    </>
  );
}

function Scene({ onBuildingClick }: { onBuildingClick: (config: SquareConfig, position: { x: number; y: number }) => void }) {
  const [hoveredBuilding, setHoveredBuilding] = useState<[number, number] | null>(null);
  const [showCameraInfo, setShowCameraInfo] = useState(true);
  const gridRef = useRef<Mesh>(null);
  const detectionPlaneRef = useRef<Mesh>(null);
  
  // Throttle logging to prevent console spam
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCameraInfo(false);
    }, 30000); // Disable logging after 30 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  const handlePlaneHover = (e: ThreeEvent<PointerEvent>) => {
    // Keep only for potential future use or event handling
    e.stopPropagation();
  };
  
  const handlePlaneOut = () => {
    // Keep only for potential future use or event handling
  };
  
  // Handler for when a building is hovered
  const handleBuildingHover = (position: [number, number], isHovered: boolean) => {
    if (isHovered) {
      // Don't show a path to the center building itself
      if (position[0] === 0 && position[1] === 0) {
        setHoveredBuilding(null);
      } else {
        setHoveredBuilding(position);
      }
    } else if (hoveredBuilding && hoveredBuilding[0] === position[0] && hoveredBuilding[1] === position[1]) {
      setHoveredBuilding(null);
    }
  };
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      
      {/* Use the fixed camera setup instead of OrbitControls */}
      <FixedCamera />
      
      {/* Visible grid for visual reference */}
      <Grid 
        ref={gridRef}
        position={[0, 0, 0]}
        args={[40, 40]} 
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#7DF9FF"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#7DF9FF"
        fadeDistance={40}
      />
      
      {/* Animated path between buildings when one is hovered */}
      {hoveredBuilding && (
        <GridPath 
          from={[0, 0]} // Center building 
          to={hoveredBuilding}
          thickness={0.15}
          gridHeight={0.01}
        />
      )}
      
      {/* Invisible plane for hover detection - positioned to start at origin but extend only in y+, x+, x- */}
      <mesh 
        ref={detectionPlaneRef}
        position={[0, 0.001, 10]} // Positioned at origin, moving +10 in Z direction to orient plane
        rotation={[-Math.PI / 2, 0, 0]} 
        onPointerMove={handlePlaneHover}
        onPointerOut={handlePlaneOut}
      >
        <planeGeometry args={[40, 20]} /> {/* 40 units wide (20 in x+ and 20 in x-), 20 units deep (all in z+/y+) */}
        <meshBasicMaterial visible={false} />
      </mesh>
      
      {/* Add configured squares from JSON */}
      {SQUARES_CONFIG.map((squareConfig, index) => (
        <ConfiguredSquare 
          key={index} 
          config={squareConfig} 
          onBuildingClick={onBuildingClick}
          onHover={handleBuildingHover}
        />
      ))}
      
      {showCameraInfo && <CameraLogger />}
    </>
  );
}

function ConfiguredSquare({ 
  config, 
  onBuildingClick,
  onHover
}: { 
  config: SquareConfig, 
  onBuildingClick: (config: SquareConfig, position: { x: number; y: number }) => void,
  onHover?: (position: [number, number], isHovered: boolean) => void
}) {
  const squareRef = useRef<Mesh>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const MAX_HEIGHT = 0.3; // Increased height for more visibility (was 0.2)
  
  // Convert grid units to scene units for width and depth
  const width = config.size[0] * CELL_SIZE;
  const depth = config.size[1] * CELL_SIZE;
  
  // Calculate position using the utility function
  const [posX, posZ] = gridToWorld(config.position[0], config.position[1]);
  
  // Offset position to make the origin at bottom-left corner instead of center
  const adjustedPosX = posX + (width / 2);
  const adjustedPosZ = posZ + (depth / 2);
  
  // Animate the square on component mount
  useEffect(() => {
    const animateUp = () => {
      setHeight(prev => {
        if (prev < MAX_HEIGHT) {
          return prev + 0.008; // Slightly faster animation for larger squares
        }
        return MAX_HEIGHT;
      });
      if (height < MAX_HEIGHT) {
        requestAnimationFrame(animateUp);
      }
    };
    
    animateUp();
  }, []);
  
  useFrame(() => {
    if (squareRef.current) {
      // Apply the animated height
      squareRef.current.scale.y = height;
      // Position needs to move up half the height to keep bottom at ground level
      squareRef.current.position.y = height / 2;
    }
  });
  
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Clear any existing timeout to prevent flickering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHovered(true);
    // Notify parent about hover state
    if (onHover) {
      onHover(config.position, true);
    }
  };
  
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Add a small delay before setting hovered to false
    // This prevents flickering when moving within the object
    hoverTimeoutRef.current = setTimeout(() => {
      setHovered(false);
      // Notify parent about hover state
      if (onHover) {
        onHover(config.position, false);
      }
    }, 100);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    // Calculate screen position for the info bubble
    if (e.nativeEvent) {
      const position = { 
        x: e.nativeEvent.clientX, 
        y: e.nativeEvent.clientY 
      };
      onBuildingClick(config, position);
    }
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <mesh 
      ref={squareRef} 
      position={[adjustedPosX, 0, adjustedPosZ]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <RoundedBox args={[width, 1, depth]} radius={0.08} smoothness={4}>
        <meshStandardMaterial color={config.color} emissive={hovered ? "#7DF9FF" : config.color} emissiveIntensity={hovered ? 0.5 : 0.1} />
        <AnimatedEdges 
          color={hovered ? "#7DF9FF" : config.highlightColor} 
          scale={1.05} 
          hovered={hovered}
          width={width}
          height={1}
          depth={depth}
        />
      </RoundedBox>
    </mesh>
  );
}

function CameraLogger() {
  const { camera } = useThree();
  
  useFrame(() => {
    // Convert rotation from radians to degrees for easier understanding
    const rotX = (camera.rotation.x * 180 / Math.PI).toFixed(2);
    const rotY = (camera.rotation.y * 180 / Math.PI).toFixed(2);
    const rotZ = (camera.rotation.z * 180 / Math.PI).toFixed(2);
    
    // Log position and rotation
    console.log(
      `Camera: position=[${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)}], ` +
      `rotation=[${rotX}°, ${rotY}°, ${rotZ}°], ` +
      `rotation (radians)=[${camera.rotation.x.toFixed(4)}, ${camera.rotation.y.toFixed(4)}, ${camera.rotation.z.toFixed(4)}]`
    );
  });
  
  return null;
}

// Fixed camera component to prevent user control
function FixedCamera() {
  const { camera } = useThree();
  
  // Set camera once on mount
  useEffect(() => {
    // Position camera at a fixed height looking at the center
    camera.position.set(0, 4, 8); // x=0 (centered), y=10 (height), z=15 (distance)
    camera.lookAt(0, 0, 0); // Look at the center of the scene
    
    
    // Update projection matrix after changes
    camera.updateProjectionMatrix();
  }, [camera]);
  
  return null;
}

export default function Hero() {
  const [activeBubble, setActiveBubble] = useState<{
    config: SquareConfig;
    position: { x: number; y: number };
  } | null>(null);

  const handleBuildingClick = (config: SquareConfig, position: { x: number; y: number }) => {
    setActiveBubble({ config, position });
  };

  const handleCloseBubble = () => {
    setActiveBubble(null);
  };

  // Close bubble when clicking outside
  useEffect(() => {
    const handleDocumentClick = () => {
      if (activeBubble) {
        setActiveBubble(null);
      }
    };
    
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [activeBubble]);

  return (
    <div className="w-full h-[100vh] bg-black">
      <Canvas 
        camera={{ 
          position: [0, 10, 15], 
          fov: 45,
        }}
      >
        <Scene onBuildingClick={handleBuildingClick} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
        Fixed camera view looking at center with -15° Y-axis angle
      </div>
      
      {/* Render info bubble outside of Canvas but inside the Hero component */}
      {activeBubble && (
        <InfoBubble 
          config={activeBubble.config} 
          position={activeBubble.position} 
          onClose={handleCloseBubble} 
        />
      )}
    </div>
  );
} 