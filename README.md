# FPS Horror Game

play at https://eb56.github.io/horror-maze-js/

An immersive first-person shooter horror game built with HTML, JavaScript, and Three.js featuring advanced lighting, monster AI, and atmospheric effects.

## How to Run

1. Open `index.html` in a modern web browser that supports WebGL.

2. Click on the page to lock the pointer for mouse look.

3. Use WASD keys to move, mouse to look, Space to jump.

4. Press F to toggle the flashlight and press Shift to run faster.

## Controls

- **WASD** - Move forward/backward/strafe (relative to camera direction)
- **Mouse** - Look around (after locking pointer with click)
- **F** - Toggle flashlight (consumes battery when on)
- **Shift** - Run (increased movement speed)
- **Space** - Jump (only when standing on ground)

## Flashlight Battery System

- Battery starts at 100% (flashlight OFF by default)
- When flashlight is ON, battery drains by 1% every 6 seconds
- Flashlight cannot be turned ON if battery is below 20%
- Battery regenerates slowly when flashlight is OFF
- Battery percentage displayed in top-right corner (green when available, red when critically low)

## Features

- Advanced 3D rendering with Three.js WebGL
- Dark atmosphere with minimal fog for horror effect
- Spotlight flashlight with limited battery power system
- Monster model loaded from GLTF
- Advanced AI: Monster chases player when flashlight is off
- Light cone detection: Monster freezes when caught in flashlight beam
- Smooth collision detection with maze walls
- Gravity system with jump mechanics
- Pointer lock controls for immersive FPS experience
- Battery HUD display with color-coded warnings
- Win condition: Reach the bottom-right corner of the maze
- Lose condition: Monster catches you
- Thick black fog for intense horror atmosphere
- Very dark environment with minimal lighting
- Giant maze with tall walls, ceiling, and floor
- Exit at the end of the maze
- 3D monster model that spawns randomly far from player and chases you
- Monster stops when illuminated by flashlight

## Development

To expand the game, you can add:

- Enemy AI
- Shooting mechanics
- Sound effects
- More complex 3D models
- Jump scares
- Levels

## Dependencies

- Three.js (loaded from CDN)

No build tools required - just open in browser.
