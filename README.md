This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

### Core Files

- `src/app/page.tsx`: Main entry point for the application. Renders the Hero component within the main container.
- `src/app/layout.tsx`: Root layout defining metadata and global structure.
- `src/app/globals.css`: Global CSS styles using Tailwind CSS.

### Components

- `src/components/Hero.tsx`: A React component that renders a 3D scene using React Three Fiber and Drei. Features a grid and orbit controls. This component is imported and used in `page.tsx` as the main visual element.
  - **Grid Hover System**: Uses an invisible detection plane that sits on top of the visual grid to reliably detect hover positions from any camera angle. When a grid square is hovered, a pillar appears at that position.
  - **Pillar Animation**: Pillars grow smoothly from the ground to a maximum height of 15px over a 1-second animation when a grid cell is hovered. Moving to a new cell resets the animation.
  - **Responsive Sizing**: Each pillar takes up an entire grid cell (0.5 × 0.5 units) for better visual feedback.
  - **JSON Configuration**: Squares are generated from a JSON configuration, allowing for easy creation of multiple squares with customizable properties like position, size, and color.
  - **Variable Sizing**: Supports creation of squares and rectangles of any size by specifying width and depth in grid units.
  - **Grid Coordinate System**: Uses a consistent coordinate system with helper functions to properly position elements in grid cells rather than on grid lines.
  - **Fixed Camera View**: Features a fixed camera position looking at the center of the grid from an elevated position with a -15 degree Y-axis rotation.
  - **Beveled Blocks**: All blocks (pillars and configured squares) have smooth beveled edges for a more polished appearance.
  - **Edge Highlighting**: Buildings feature glowing edges that highlight their outline while maintaining a clean surface appearance.
  - **Interactive Highlights**: Buildings change their edge color to cyan (#7DF9FF) when hovered, creating a cohesive visual connection with the grid.
  - **Cyan Grid Lines**: The grid uses a bright cyan color (#7DF9FF) for improved visibility and aesthetic appeal.

### Configuration

The project uses a JSON-based configuration system to define squares on the grid:

```typescript
interface SquareConfig {
  position: [number, number]; // x, z coordinates
  size: [number, number];     // width, depth in grid units
  color: string;              
  highlightColor: string;     // Used for default edge highlighting (non-hovered state)
  name: string;               // For future implementation
}
```

The configuration allows easy definition of:
- Position in grid coordinates
- Size in grid units (supports rectangular shapes)
- Color properties
- Highlight color for default edges (cyan edge highlighting is applied on hover)
- Name (prepared for future features)

### Coordinate System

The project uses a grid-based coordinate system:
- One grid cell = 0.5 units in the 3D space
- Grid lines are positioned at integer coordinates
- Grid cells are centered between grid lines
- Helper functions ensure all elements are properly positioned relative to the grid

### 3D Functionality

The project uses several libraries for 3D rendering:

- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for React Three Fiber, including `RoundedBox` for beveled geometry and `Edges` for edge highlighting
- **three.js**: 3D library that powers the visualization

The `Hero` component contains a `Scene` function that sets up the 3D environment with lighting, a grid, and interactive controls.

### Camera Setup

The scene uses a fixed camera configuration:
- Positioned at coordinates [0, 10, 15] (centered, elevated, backed away)
- Points directly at the center of the scene (0, 0, 0)
- Has a -15 degree rotation in the Y axis for an angled perspective
- Field of view of 45 degrees for a natural perspective

## Recent Updates

### 2023-06-22: Removed Hover Pillar Effect
- Removed the blue pillar that previously appeared when hovering over empty grid cells
- Simplified the grid interaction system to focus only on building highlighting
- Reduced visual noise by eliminating dynamic elements that were not essential
- Maintained the grid path animation between buildings when hovering
- Cleaned up related code including position tracking, animation states, and detection logic
- Created a cleaner, more focused UI with fewer distractions

### 2023-06-21: Updated Grid Positioning
- Modified the grid and detection plane to start at the origin (0,0)
- Restricted plane generation to only extend in positive y, positive x, and negative x directions
- Increased grid size to 40x40 units for a larger workspace
- Adjusted the detection plane dimensions to 40x20 units to match the new orientation
- Added coordinate validation to ensure only interactions in valid areas are processed
- Maintained the same visual style and interaction capabilities with improved positioning

### 2023-06-20: Fixed Block Positioning
- Corrected block positioning to properly offset based on block dimensions
- Updated the positioning logic to use the bottom-left corner as the origin point 
- Fixed an issue where rectangular blocks (like 2x1) were incorrectly centered on their position
- Adjusted hover detection to match the new positioning system
- Ensured consistent block placement relative to the grid coordinate system
- Improved visual alignment of blocks, especially for non-square shapes

### 2023-06-19: Fixed Grid Path Scaling
- Corrected the path scaling to properly follow grid cell dimensions
- Applied the gridToWorld conversion function to ensure correct coordinate scaling
- Fixed the "double distance" issue where paths were moving twice as far as they should
- Improved coordinate handling by separating grid coordinates from world coordinates
- Maintained visual consistency with the grid's actual cell sizes
- Fixed grid path movement to properly navigate "2 right, 1 down" instead of "4 right, 2 down"

### 2023-06-18: Fixed Grid Path Animation
- Resolved "LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN" errors
- Improved path rendering by using two separate line segments instead of a single line
- Added better error handling for edge cases with invalid coordinates
- Enhanced coordinate validation with Number conversion and isFinite checks
- Improved animation smoothness and corner turning visibility
- Made rendering approach more stable by breaking path into logical segments

### 2023-06-17: Added Animated Grid Path Connection
- Implemented dynamic path visualization between the center building and hovered buildings
- Created animated pathway that follows grid lines (Manhattan distance route)
- Added smooth animation that draws the path from source to destination
- Used thick cyan lines that match the grid's aesthetic for visual consistency
- Enhanced user experience by providing visual connectivity between related buildings
- Reset animation when hovering over different buildings for continuous feedback

### 2023-06-16: Fixed Info Bubble Implementation
- Restructured the architecture to properly handle HTML UI elements with Three.js
- Moved bubble rendering outside the 3D canvas into the parent component
- Implemented proper state management for active building information
- Fixed the "Button is not part of THREE namespace" error
- Enhanced event flow between 3D objects and HTML interface
- Improved click-outside behavior for better user experience

### 2023-06-15: Added Interactive Information Bubbles
- Implemented clickable buildings that display detailed information
- Added popover bubbles with building details when clicking on structures
- Enhanced the JSON configuration with three new fields: description, category, and status
- Created an elegant UI with cyan accents to match the overall design language
- Added close button and click-outside functionality for better user experience
- Positioned bubbles relative to click position for intuitive interaction

### 2023-06-14: Fixed Hover Effect Stability
- Added debounce mechanism to prevent hover effect from flickering when moving within buildings
- Implemented timeout-based approach for smoother hover state transitions
- Added cleanup logic to prevent memory leaks from lingering timeouts
- Enhanced user experience by maintaining stable hover highlights during mouse movement
- Fixed issue where hover effects would reset when moving the cursor inside a building

### 2023-06-13: Enhanced Edge Highlighting with Glow Effect
- Completely redesigned edge highlighting system for more visual impact
- Created custom BoxLines component with thick lines (3px) for clear edge visibility
- Added a spherical glow effect that surrounds buildings when hovered
- Combined pulsing animation with a wireframe sphere to create a sci-fi highlight aesthetic
- Dynamically scales highlight effect based on building dimensions
- Dramatically improved visibility of edge highlighting through layered visual effects

### 2023-06-12: Added Animated Edge Highlighting
- Implemented pulsing edge animation that activates when buildings are hovered
- Created a custom AnimatedEdges component for dynamic edge effects
- Added subtle edge scale animation that pulses with time
- Implemented opacity variation to create a flowing highlight effect
- Used Color utility to create RGBA colors with changing opacity
- Enhanced visual feedback for user interaction with animated highlighting

### 2023-06-11: Enhanced Interactive Hover Highlighting
- Fixed pointer event handling to ensure reliable hover detection
- Added emissive highlighting that changes both edge and surface color when hovered
- Increased edge scale and visibility parameters for more prominent highlighting
- Made cyan highlight color (#7DF9FF) more visible with higher emissive intensity
- Improved event propagation to prevent interaction conflicts
- Adjusted rendering order to ensure hover detection works correctly

### 2023-06-10: Enhanced Visual Style with Edge Highlights
- Changed grid line color to cyan (#7DF9FF) for better visibility
- Added edge highlighting to all buildings using the Edges component
- Reduced the emissive intensity of building surfaces for cleaner appearance
- Configured edge thickness and scale parameters for optimal visual effect
- Linked highlight colors from configuration to edge highlights

### 2023-06-09: Added Beveled Edges to Blocks
- Replaced standard BoxGeometry with RoundedBox from drei
- Added subtle beveled edges to all pillars and configured squares
- Used different bevel radii for different sized blocks (smaller for pillars, larger for big squares)
- Added smoothness parameter to control bevel quality
- Enhanced visual appeal with softer, more polished appearance

### 2023-06-08: Implemented Fixed Camera View
- Replaced orbit controls with a fixed camera position
- Added a custom FixedCamera component that sets up the camera once
- Positioned camera at [0, 10, 15] with a view centered on the grid
- Applied a -15 degree Y-axis rotation for a consistent viewing angle
- Reduced the FOV to 45 degrees for better perspective

### 2023-06-07: Increased Square Dimensions
- Doubled the size of all configured squares for better visibility
- Increased the maximum height of squares from 0.2 to 0.3 units
- Adjusted square positions to prevent overlap
- Improved animation speed for the larger squares
- The center square is now 4×4 (was 2×2), providing a more substantial focal point

### 2023-06-06: Improved Grid Positioning System
- Added a consistent grid coordinate system with helper functions
- Fixed positioning of squares to be properly centered in grid cells
- Improved collision detection with more accurate boundary calculations
- Extracted constants to ensure consistent sizing across components

### 2023-06-05: Implemented JSON Configuration System
- Refactored square generation to use a JSON-based configuration
- Added support for multiple squares with different properties
- Implemented dynamic collision detection for hover pillars
- Added ability to create rectangles and custom-sized shapes
- Prepared structure for future features (highlighting, naming)

### 2023-06-04: Added Central Reference Square
- Added a larger 2×2 square at position (0,0) that spans four grid cells
- Implemented a separate animation for the reference square
- Used a distinct color to differentiate it from hover pillars
- Added logic to prevent hover pillars from appearing over the central square

### 2023-06-03: Enhanced Pillar Visuals and Interactions
- Modified pillar dimensions to fill the entire grid cell (0.5 × 0.5 units)
- Added cell-specific animation reset when moving between cells
- Improved hover position tracking using refs to compare previous and current positions

### 2023-06-02: Optimized Pillar Height and Animation
- Adjusted pillar maximum height to be exactly 15px
- Implemented smooth animation that completes in approximately 1 second
- Fixed pillar positioning to ensure they start from the ground level
- Added proper animation timing constants for better control

### 2023-06-01: Improved Grid Hover Detection
- Modified `src/components/Hero.tsx` to use a separate invisible plane for hover detection instead of using the Grid component directly
- Fixed issues with pillar appearance when viewing the grid from different camera angles
- Simplified the hover detection logic for more reliable interaction

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
