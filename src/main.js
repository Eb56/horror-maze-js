import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

// =====================================================
//  MAZE DATA
// =====================================================
const mazeSize = 55;
const CELL_SIZE = 2;
const WALL_HEIGHT = 3.5;
const PLAYER_HEIGHT = 1.7;

const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
  [1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
  [1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
  [1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// =====================================================
//  GAME STATE
// =====================================================
let gameState = 'TITLE'; // TITLE | PLAYING | DEAD | WIN

// =====================================================
//  UI / HTML OVERLAY
// =====================================================
const css = document.createElement('style');
css.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap');

  #title-screen {
    position: fixed; inset: 0;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;
    font-family: 'Oswald', 'Impact', sans-serif;
    color: #fff;
    transition: opacity 1.2s ease;
  }

  #title-screen h1 {
    font-size: clamp(3rem, 10vw, 7rem);
    color: #cc0000;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-shadow: 0 0 20px #ff0000, 0 0 50px #990000;
    animation: flicker 5s infinite;
    margin-bottom: 0.3em;
  }

  #title-screen .subtitle {
    font-size: clamp(0.8rem, 2vw, 1.1rem);
    color: #555;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    margin-bottom: 3.5em;
  }

  .game-btn {
    padding: 14px 48px;
    background: transparent;
    border: 2px solid #cc0000;
    color: #cc0000;
    font-family: inherit;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s, color 0.25s, box-shadow 0.25s;
    margin: 8px;
    display: block;
  }
  .game-btn:hover {
    background: #cc0000;
    color: #fff;
    box-shadow: 0 0 24px #cc0000;
  }
  .game-btn.green { border-color: #00ff88; color: #00ff88; }
  .game-btn.green:hover { background: #00ff88; color: #000; box-shadow: 0 0 24px #00ff88; }

  .controls-hint {
    margin-top: 2.5em;
    color: #444;
    font-size: clamp(0.65rem, 1.5vw, 0.8rem);
    letter-spacing: 0.12em;
    text-align: center;
    line-height: 2.2;
    text-transform: uppercase;
  }
  .controls-hint span { color: #666; }

  @keyframes flicker {
    0%,88%,90%,92%,100% { opacity: 1; }
    89% { opacity: 0.3; }
    91% { opacity: 0.7; }
  }

  /* ---- Overlay (death / win) ---- */
  #overlay-screen {
    position: fixed; inset: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 200;
    font-family: 'Oswald', 'Impact', sans-serif;
    color: #fff;
    text-align: center;
    pointer-events: none;
  }
  #overlay-screen.show { display: flex; pointer-events: all; }
  #overlay-screen h2 {
    font-size: clamp(3rem, 9vw, 5.5rem);
    text-shadow: 0 0 30px currentColor;
    animation: flicker 4s infinite;
    margin-bottom: 0.3em;
  }
  #overlay-screen p {
    font-size: clamp(0.8rem, 2vw, 1.1rem);
    color: #999;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-bottom: 2.5em;
  }

  /* ---- HUD ---- */
  #hud {
    position: fixed;
    bottom: 28px; left: 50%;
    transform: translateX(-50%);
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    z-index: 100;
    pointer-events: none;
    font-family: 'Courier New', monospace;
  }
  #hud.show { display: flex; }

  #battery-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 0.12em;
    color: #00ff88;
    text-shadow: 0 0 8px #00ff88;
    text-transform: uppercase;
  }
  #battery-bar {
    width: 110px; height: 7px;
    border: 1px solid currentColor;
    border-radius: 2px;
    overflow: hidden;
  }
  #battery-fill {
    height: 100%;
    background: #00ff88;
    box-shadow: 0 0 6px #00ff88;
    transition: width 0.4s, background 0.4s, box-shadow 0.4s;
  }

  /* ---- Crosshair ---- */
  #crosshair {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 14px; height: 14px;
    display: none;
    pointer-events: none;
    z-index: 100;
  }
  #crosshair.show { display: block; }
  #crosshair::before, #crosshair::after {
    content: '';
    position: absolute;
    background: rgba(255,255,255,0.55);
    border-radius: 1px;
  }
  #crosshair::before { width: 2px; height: 100%; left: calc(50% - 1px); }
  #crosshair::after  { width: 100%; height: 2px; top: calc(50% - 1px); }

  /* ---- Danger vignette ---- */
  #vignette {
    position: fixed; inset: 0;
    pointer-events: none;
    z-index: 90;
    opacity: 0;
    transition: opacity 0.6s;
    background: radial-gradient(ellipse at center, transparent 45%, rgba(140,0,0,0.85) 100%);
  }

  /* ---- Proximity warning ---- */
  #proximity {
    position: fixed;
    top: 28px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 0.35em;
    color: #ff2200;
    text-shadow: 0 0 12px #ff2200;
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
    z-index: 100;
    text-transform: uppercase;
  }

  /* ---- Objective ---- */
  #objective {
    position: fixed;
    top: 22px; left: 22px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #00ff88;
    opacity: 0.65;
    pointer-events: none;
    z-index: 100;
    display: none;
    text-transform: uppercase;
  }
  #objective.show { display: block; }

  /* ---- Flash (on death) ---- */
  #flash {
    position: fixed; inset: 0;
    background: red;
    opacity: 0;
    pointer-events: none;
    z-index: 190;
    transition: opacity 0.1s;
  }
`;
document.head.appendChild(css);

// Build DOM elements
const titleScreen = document.createElement('div');
titleScreen.id = 'title-screen';
titleScreen.innerHTML = `
  <h1>The Maze</h1>
  <div class="subtitle">There is no way out&hellip;</div>
  <button class="game-btn" id="start-btn">Enter the Maze</button>
  <div class="controls-hint">
    <span>WASD</span> Move &nbsp;&bull;&nbsp; <span>Mouse</span> Look &nbsp;&bull;&nbsp; <span>F</span> Flashlight<br>
    <span>Shift</span> Sprint &nbsp;&bull;&nbsp; <span>Space</span> Jump
  </div>
`;
document.body.appendChild(titleScreen);

const overlayScreen = document.createElement('div');
overlayScreen.id = 'overlay-screen';
document.body.appendChild(overlayScreen);

const hud = document.createElement('div');
hud.id = 'hud';
hud.innerHTML = `
  <div id="battery-wrap">
    <span>&#9889; Flashlight</span>
    <div id="battery-bar"><div id="battery-fill"></div></div>
    <span id="battery-pct">100%</span>
  </div>
`;
document.body.appendChild(hud);

const crosshair = document.createElement('div');
crosshair.id = 'crosshair';
document.body.appendChild(crosshair);

const vignette = document.createElement('div');
vignette.id = 'vignette';
document.body.appendChild(vignette);

const proximityEl = document.createElement('div');
proximityEl.id = 'proximity';
proximityEl.textContent = '⚠  IT IS CLOSE  ⚠';
document.body.appendChild(proximityEl);

const objectiveEl = document.createElement('div');
objectiveEl.id = 'objective';
objectiveEl.textContent = '▸ Find the exit';
document.body.appendChild(objectiveEl);

const flashEl = document.createElement('div');
flashEl.id = 'flash';
document.body.appendChild(flashEl);

// =====================================================
//  THREE.JS CORE
// =====================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.028);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 150);
camera.position.set(3, PLAYER_HEIGHT, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('game-canvas'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// =====================================================
//  LIGHTING
// =====================================================
const ambientLight = new THREE.AmbientLight(0x050510, 1.0);
scene.add(ambientLight);

// =====================================================
//  TEXTURES
// =====================================================
const texLoader = new THREE.TextureLoader();

const wallTex = texLoader.load('textures/wall.jfif', tex => {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
});

const wallMat = new THREE.MeshStandardMaterial({
  map: wallTex,
  color: 0x777777,
  roughness: 0.95,
  metalness: 0.0,
});

const floorMat = new THREE.MeshStandardMaterial({
  color: 0x121212,
  roughness: 1.0,
});

const ceilingMat = new THREE.MeshStandardMaterial({
  color: 0x080808,
  roughness: 1.0,
});

// =====================================================
//  GEOMETRY — floor, ceiling, walls
// =====================================================
const span = mazeSize * CELL_SIZE;
const floorGeo = new THREE.PlaneGeometry(span + 20, span + 20);
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.set(span / 2, 0, span / 2);
floor.receiveShadow = true;
scene.add(floor);

const ceilGeo = new THREE.PlaneGeometry(span + 20, span + 20);
const ceiling = new THREE.Mesh(ceilGeo, ceilingMat);
ceiling.rotation.x = Math.PI / 2;
ceiling.position.set(span / 2, WALL_HEIGHT, span / 2);
ceiling.receiveShadow = true;
scene.add(ceiling);

// Instanced walls for performance
const wallGeom = new THREE.BoxGeometry(CELL_SIZE, WALL_HEIGHT, CELL_SIZE);
const wallCount = maze.reduce((a, row) => a + row.reduce((b, v) => b + v, 0), 0);
const wallMesh = new THREE.InstancedMesh(wallGeom, wallMat, wallCount);
wallMesh.castShadow = true;
wallMesh.receiveShadow = true;

const dummy = new THREE.Object3D();
let wi = 0;
// Store wall AABBs for collision (we only need 2D: x±, z±)
const wallBoxes = []; // {minX, maxX, minZ, maxZ}
for (let gz = 0; gz < mazeSize; gz++) {
  for (let gx = 0; gx < mazeSize; gx++) {
    if (maze[gz][gx] === 1) {
      const cx = gx * CELL_SIZE + CELL_SIZE / 2;
      const cz = gz * CELL_SIZE + CELL_SIZE / 2;
      dummy.position.set(cx, WALL_HEIGHT / 2, cz);
      dummy.updateMatrix();
      wallMesh.setMatrixAt(wi++, dummy.matrix);
      wallBoxes.push({ minX: cx - CELL_SIZE / 2, maxX: cx + CELL_SIZE / 2, minZ: cz - CELL_SIZE / 2, maxZ: cz + CELL_SIZE / 2 });
    }
  }
}
wallMesh.instanceMatrix.needsUpdate = true;
scene.add(wallMesh);

// =====================================================
//  EXIT PORTAL
// =====================================================
const EXIT_GX = 53, EXIT_GZ = 53;
const exitWX = EXIT_GX * CELL_SIZE + CELL_SIZE / 2;
const exitWZ = EXIT_GZ * CELL_SIZE + CELL_SIZE / 2;

const exitGroup = new THREE.Group();
exitGroup.position.set(exitWX, 0, exitWZ);

const ringGeo = new THREE.TorusGeometry(0.9, 0.1, 16, 48);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ff88 });
const portalRing = new THREE.Mesh(ringGeo, ringMat);
portalRing.position.y = 1.6;
portalRing.rotation.y = Math.PI / 2;
exitGroup.add(portalRing);

const portalGeo = new THREE.PlaneGeometry(1.6, 2.8);
const portalMat = new THREE.MeshBasicMaterial({
  color: 0x00ff88, transparent: true, opacity: 0.12, side: THREE.DoubleSide
});
const portalPlane = new THREE.Mesh(portalGeo, portalMat);
portalPlane.position.y = 1.6;
portalPlane.rotation.y = Math.PI / 2;
exitGroup.add(portalPlane);

const exitPL = new THREE.PointLight(0x00ff88, 5, 12, 2);
exitPL.position.y = 1.6;
exitGroup.add(exitPL);

scene.add(exitGroup);

// =====================================================
//  FLASHLIGHT
// =====================================================
const flashlight = new THREE.SpotLight(0xfff0dd, 90, 32, Math.PI / 6.5, 0.75, 1.6);
flashlight.castShadow = true;
flashlight.shadow.mapSize.width = 1024;
flashlight.shadow.mapSize.height = 1024;
flashlight.shadow.camera.near = 0.3;
flashlight.shadow.camera.far = 35;
flashlight.visible = false;
scene.add(flashlight);
scene.add(flashlight.target);

let flashlightOn = false;

// Lagged direction — we lerp this toward actual camera dir each frame
const flashDir = new THREE.Vector3(0, 0, -1);
const FLASH_LAG = 5; // lower = more lag (speed units per second)

let battery = 100;
const DRAIN_RATE = 1.02;   // % per second while ON
const REGEN_RATE = 0.97;   // % per second while OFF

// Faint ambient glow around player (always on)
const playerGlow = new THREE.PointLight(0x110810, 0.8, 4, 2);
scene.add(playerGlow);

// =====================================================
//  ENEMY — procedural creepy figure
// =====================================================
function buildEnemy() {
  const g = new THREE.Group();
  const dark = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 1.0 });
  const glowEye = new THREE.MeshBasicMaterial({ color: 0xff1500 });

  // Torso — elongated, slightly warped
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.5, 0.28), dark);
  torso.position.y = 1.55;
  g.add(torso);

  // Head — oversized
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 8), dark);
  head.position.y = 2.7;
  head.scale.y = 1.15;
  g.add(head);

  // Eyes
  const eyeG = new THREE.SphereGeometry(0.075, 8, 6);
  const le = new THREE.Mesh(eyeG, glowEye); le.position.set(-0.13, 2.76, 0.31);
  const re = new THREE.Mesh(eyeG, glowEye); re.position.set( 0.13, 2.76, 0.31);
  g.add(le, re);

  // Eye light
  const eyeLight = new THREE.PointLight(0xff1500, 1.5, 4, 2);
  eyeLight.position.set(0, 2.75, 0.35);
  g.add(eyeLight);

  // Arms — too long and angled out
  const armG = new THREE.BoxGeometry(0.15, 1.8, 0.15);
  const la = new THREE.Mesh(armG, dark); la.position.set(-0.55, 1.2, 0); la.rotation.z =  0.35;
  const ra = new THREE.Mesh(armG, dark); ra.position.set( 0.55, 1.2, 0); ra.rotation.z = -0.35;
  g.add(la, ra);

  // Legs
  const legG = new THREE.BoxGeometry(0.22, 1.3, 0.22);
  const ll = new THREE.Mesh(legG, dark); ll.position.set(-0.2, 0.35, 0);
  const rl = new THREE.Mesh(legG, dark); rl.position.set( 0.2, 0.35, 0);
  g.add(ll, rl);

  g.traverse(c => { if (c.isMesh) { c.castShadow = true; } });
  return g;
}

const enemy = buildEnemy();
// Start enemy near maze center
enemy.position.set(27 * CELL_SIZE + 1, 0, 27 * CELL_SIZE + 1);
scene.add(enemy);

// Enemy AI
let enemyPath = [];
let pathTimer = 0;
let enemyActive = false;
let enemyAnimT = 0;
const CHASE_DIST   = 32;  // detection range
const WALK_SPEED_E = 2.8;
const RUN_SPEED_E  = 5.5;
const PATH_INTERVAL = 1.2; // seconds between BFS updates

// BFS on maze grid
function bfsPath(sx, sz, gx, gz) {
  if (sx === gx && sz === gz) return [];
  const visited = new Set([`${sx},${sz}`]);
  const queue = [{ x: sx, z: sz, path: [] }];
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let limit = 3000;
  while (queue.length && limit-- > 0) {
    const { x, z, path } = queue.shift();
    for (const [dx, dz] of dirs) {
      const nx = x + dx, nz = z + dz;
      if (nx < 0 || nx >= mazeSize || nz < 0 || nz >= mazeSize) continue;
      if (maze[nz][nx] === 1) continue;
      const k = `${nx},${nz}`;
      if (visited.has(k)) continue;
      visited.add(k);
      const np = [...path, { x: nx, z: nz }];
      if (nx === gx && nz === gz) return np;
      queue.push({ x: nx, z: nz, path: np });
    }
  }
  return [];
}

// =====================================================
//  CONTROLS
// =====================================================
const controls = new PointerLockControls(camera, renderer.domElement);

const keys = {};
const velocity = new THREE.Vector3();
let isGrounded = true;
const GRAVITY    = -22;
const JUMP_POWER =  7;
const WALK_SPEED =  5;
const SPRINT_SPD =  9;

document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (gameState !== 'PLAYING') return;

  if (e.code === 'KeyF') {
    if (flashlightOn) {
      flashlightOn = false;
      flashlight.visible = false;
    } else if (battery > 5) {
      flashlightOn = true;
      flashlight.visible = true;
    }
  }
  if (e.code === 'Space' && isGrounded) {
    velocity.y = JUMP_POWER;
    isGrounded = false;
  }
});
document.addEventListener('keyup', e => { keys[e.code] = false; });

renderer.domElement.addEventListener('click', () => {
  if (gameState === 'PLAYING') controls.lock();
});

// =====================================================
//  AMBIENT SOUND
// =====================================================
const ambience = new Audio('sounds/amb.mp3');
ambience.loop = true;
ambience.volume = 0.13;

// =====================================================
//  COLLISION (AABB grid-based)
// =====================================================
function canOccupy(px, pz) {
  const r = 0.32;
  const corners = [[px-r, pz-r],[px+r, pz-r],[px-r, pz+r],[px+r, pz+r]];
  for (const [cx, cz] of corners) {
    const gx = Math.floor(cx / CELL_SIZE);
    const gz = Math.floor(cz / CELL_SIZE);
    if (gx < 0 || gx >= mazeSize || gz < 0 || gz >= mazeSize) return false;
    if (maze[gz][gx] === 1) return false;
  }
  return true;
}

// =====================================================
//  GAME FLOW
// =====================================================
function showScreen(html, bgColor) {
  overlayScreen.innerHTML = html;
  overlayScreen.style.background = bgColor;
  overlayScreen.classList.add('show');
}

function startGame() {
  gameState = 'PLAYING';
  titleScreen.style.opacity = '0';
  titleScreen.style.pointerEvents = 'none';
  setTimeout(() => { titleScreen.style.display = 'none'; }, 1300);

  hud.classList.add('show');
  crosshair.classList.add('show');
  objectiveEl.classList.add('show');

  // Reset player
  camera.position.set(3, PLAYER_HEIGHT, 3);
  velocity.set(0, 0, 0);
  battery = 100;
  flashlightOn = false;
  flashlight.visible = false;
  flashDir.set(0, 0, -1);

  // Reset enemy
  enemy.position.set(27 * CELL_SIZE + 1, 0, 27 * CELL_SIZE + 1);
  enemyPath = [];
  pathTimer = 0;
  enemyActive = false;

  // Ambience
  ambience.currentTime = 0;
  ambience.play().catch(() => {});

  controls.lock();
}

function playerDied() {
  if (gameState !== 'PLAYING') return;
  gameState = 'DEAD';
  controls.unlock();
  flashlight.visible = false;
  flashlightOn = false;

  // Red flash
  flashEl.style.opacity = '0.9';
  setTimeout(() => { flashEl.style.opacity = '0'; }, 200);

  setTimeout(() => {
    showScreen(`
      <h2 style="color:#cc0000">YOU DIED</h2>
      <p>It found you in the dark</p>
      <button class="game-btn" id="ov-btn">Try Again</button>
    `, 'rgba(60,0,0,0.88)');
    document.getElementById('ov-btn').addEventListener('click', () => {
      overlayScreen.classList.remove('show');
      startGame();
    });
  }, 400);
}

function playerWon() {
  if (gameState !== 'PLAYING') return;
  gameState = 'WIN';
  controls.unlock();

  showScreen(`
    <h2 style="color:#00ff88">ESCAPED</h2>
    <p>You found a way out</p>
    <button class="game-btn green" id="ov-btn">Play Again</button>
  `, 'rgba(0,30,18,0.92)');
  document.getElementById('ov-btn').addEventListener('click', () => {
    overlayScreen.classList.remove('show');
    startGame();
  });
}

document.getElementById('start-btn').addEventListener('click', startGame);

// =====================================================
//  ANIMATION LOOP
// =====================================================
let prevTime = performance.now();

function animate() {
  requestAnimationFrame(animate);

  const now   = performance.now();
  const delta = Math.min((now - prevTime) / 1000, 0.05);
  prevTime    = now;

  // Only simulate when playing
  if (gameState !== 'PLAYING') {
    renderer.render(scene, camera);
    return;
  }

  // ── PLAYER MOVEMENT ──────────────────────────────
  const sprint = keys['ShiftLeft'] || keys['ShiftRight'];
  const speed  = sprint ? SPRINT_SPD : WALK_SPEED;

  const moveDir = new THREE.Vector3();
  if (keys['KeyW']) moveDir.z -= 1;
  if (keys['KeyS']) moveDir.z += 1;
  if (keys['KeyA']) moveDir.x -= 1;
  if (keys['KeyD']) moveDir.x += 1;

  if (moveDir.length() > 0) {
    moveDir.normalize();
    const fwd = camera.getWorldDirection(new THREE.Vector3()); fwd.y = 0; fwd.normalize();
    const rgt = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0,1,0)).normalize();
    velocity.x = (rgt.x * moveDir.x + fwd.x * -moveDir.z) * speed;
    velocity.z = (rgt.z * moveDir.x + fwd.z * -moveDir.z) * speed;
  } else {
    velocity.x *= 0.82;
    velocity.z *= 0.82;
  }

  // Gravity
  if (!isGrounded) {
    velocity.y += GRAVITY * delta;
  }

  // Collide & move X
  const nx = camera.position.x + velocity.x * delta;
  if (canOccupy(nx, camera.position.z)) camera.position.x = nx;
  else velocity.x = 0;

  // Collide & move Z
  const nz = camera.position.z + velocity.z * delta;
  if (canOccupy(camera.position.x, nz)) camera.position.z = nz;
  else velocity.z = 0;

  // Vertical
  camera.position.y += velocity.y * delta;
  if (camera.position.y <= PLAYER_HEIGHT) {
    camera.position.y = PLAYER_HEIGHT;
    velocity.y  = 0;
    isGrounded  = true;
  }

  // ── FLASHLIGHT (with lag) ─────────────────────────
  const camDir = camera.getWorldDirection(new THREE.Vector3());

  // Lerp the flashlight direction toward camera direction each frame
  flashDir.lerp(camDir, Math.min(1, FLASH_LAG * delta));
  flashDir.normalize();

  // Position flashlight just ahead and slightly below eye level
  flashlight.position.copy(camera.position)
    .addScaledVector(camDir, 0.25);
  flashlight.position.y -= 0.08;

  flashlight.target.position
    .copy(flashlight.position)
    .addScaledVector(flashDir, 25);
  flashlight.target.updateMatrixWorld();

  playerGlow.position.copy(camera.position);

  // Battery
  if (flashlightOn) {
    battery -= DRAIN_RATE * delta;
    if (battery <= 0) {
      battery = 0;
      flashlightOn = false;
      flashlight.visible = false;
    }
  } else {
    battery = Math.min(100, battery + REGEN_RATE * delta);
  }

  // HUD battery
  const pct = Math.max(0, Math.floor(battery));
  const bFill = document.getElementById('battery-fill');
  const bPct  = document.getElementById('battery-pct');
  const bWrap = document.getElementById('battery-wrap');
  if (bFill) {
    const col = pct < 20 ? '#ff3300' : pct < 45 ? '#ffaa00' : '#00ff88';
    bFill.style.width    = pct + '%';
    bFill.style.background  = col;
    bFill.style.boxShadow   = `0 0 6px ${col}`;
    bPct.textContent         = pct + '%';
    bPct.style.color         = col;
    bWrap.style.color        = col;
    bWrap.style.textShadow   = `0 0 8px ${col}`;
  }

  // ── ENEMY AI ─────────────────────────────────────
  const pGX = Math.floor(camera.position.x / CELL_SIZE);
  const pGZ = Math.floor(camera.position.z / CELL_SIZE);
  const eGX = Math.floor(enemy.position.x  / CELL_SIZE);
  const eGZ = Math.floor(enemy.position.z  / CELL_SIZE);
  const distToEnemy = camera.position.distanceTo(enemy.position);

  // Activate once player gets somewhat close or enters chase radius
  if (!enemyActive && distToEnemy < CHASE_DIST) enemyActive = true;

  if (enemyActive) {
    pathTimer -= delta;
    if (pathTimer <= 0) {
      pathTimer  = PATH_INTERVAL;
      enemyPath  = bfsPath(eGX, eGZ, pGX, pGZ);
    }

    const eSpeed = distToEnemy < 10 ? RUN_SPEED_E : WALK_SPEED_E;

    if (enemyPath.length > 0) {
      const wp = enemyPath[0];
      const tx = wp.x * CELL_SIZE + CELL_SIZE / 2;
      const tz = wp.z * CELL_SIZE + CELL_SIZE / 2;
      const toWP = new THREE.Vector3(tx - enemy.position.x, 0, tz - enemy.position.z);
      const d = toWP.length();

      if (d < 0.25) {
        enemyPath.shift();
      } else {
        toWP.normalize();
        enemy.position.x += toWP.x * eSpeed * delta;
        enemy.position.z += toWP.z * eSpeed * delta;
        enemy.position.y = 0;
        enemy.rotation.y = Math.atan2(toWP.x, toWP.z);
      }
    }
  }

  // Enemy idle/walk animation
  enemyAnimT += delta;
  const bob = Math.sin(enemyAnimT * (enemyActive && distToEnemy < 10 ? 6 : 3)) * 0.06;
  enemy.position.y = bob;
  // Sway torso
  if (enemy.children[0]) enemy.children[0].rotation.z = Math.sin(enemyAnimT * 1.8) * 0.04;
  // Swing arms
  if (enemy.children[5]) enemy.children[5].rotation.x =  Math.sin(enemyAnimT * 3) * 0.35;
  if (enemy.children[6]) enemy.children[6].rotation.x = -Math.sin(enemyAnimT * 3) * 0.35;

  // ── PROXIMITY EFFECTS ────────────────────────────
  if (distToEnemy < 20) {
    const t = 1 - distToEnemy / 20;
    vignette.style.opacity = (t * 0.95).toFixed(2);
    proximityEl.style.opacity = distToEnemy < 9 ? '1' : '0';

    // Flashlight flicker when very close
    if (distToEnemy < 6 && flashlightOn && Math.random() < 0.015) {
      flashlight.intensity = Math.random() * 60 + 20;
      setTimeout(() => { if (flashlight) flashlight.intensity = 90; }, 80);
    }
  } else {
    vignette.style.opacity = '0';
    proximityEl.style.opacity = '0';
  }

  // ── WIN / LOSE CHECKS ────────────────────────────
  const dxE = camera.position.x - exitWX;
  const dzE = camera.position.z - exitWZ;
  if (Math.sqrt(dxE*dxE + dzE*dzE) < 1.6) {
    playerWon();
  }

  if (distToEnemy < 1.1) {
    playerDied();
  }

  // ── EXIT PORTAL ANIMATION ────────────────────────
  portalRing.rotation.z  += delta * 1.8;
  portalPlane.material.opacity = 0.1 + Math.sin(now * 0.002) * 0.06;
  exitPL.intensity = 4 + Math.sin(now * 0.003) * 1.5;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
