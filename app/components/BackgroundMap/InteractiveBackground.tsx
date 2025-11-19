'use client';

import React, { useEffect, useRef } from 'react';

// --- FINTECH CONFIGURATION ---
// Darker, striking Navy for data points (High Contrast)
const PARTICLE_COLOR = 'rgba(17, 30, 54, 0.7)'; 
// Tech Blue for connections (Network feel)
const LINE_COLOR = 'rgba(59, 130, 246, 0.3)'; 
// Clean white background
const BG_COLOR = '#ffffff'; 
// More particles = "Big Data" feel (Lower number = More particles)
const PARTICLE_COUNT_DIVISOR = 12000; 
const CONNECTION_DISTANCE = 130; 
const MOUSE_RADIUS = 220; 
// ---------------------

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // 1. Initialize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / PARTICLE_COUNT_DIVISOR);
      particles.current = [];
      for (let i = 0; i < count; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower, more precise movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1.5, // Slightly larger data points
        });
      }
    };

    // 2. Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Clean Background
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid lines (Optional: Adds extra "Chart" feel)
      // drawGrid(ctx, canvas); 

      const pList = particles.current;

      // Update and Draw Particles
      for (let i = 0; i < pList.length; i++) {
        const p = pList[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse Interaction (Magnetic Data Effect)
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
          const angle = Math.atan2(dy, dx);
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          // Push gently away to create a clearing effect
          const pushX = Math.cos(angle) * force * 0.8; 
          const pushY = Math.sin(angle) * force * 0.8;
          p.x -= pushX;
          p.y -= pushY;
        }

        // Draw Data Point (SQUARE for digital feel)
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.fillRect(p.x, p.y, p.size, p.size); 

        // Draw Connections (Network Graph)
        for (let j = i + 1; j < pList.length; j++) {
          const p2 = pList[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = 1.5 - (dist2 / CONNECTION_DISTANCE) * 1.5; // Tapered lines
            ctx.moveTo(p.x + p.size / 2, p.y + p.size / 2); // Center line on square
            ctx.lineTo(p2.x + p2.size / 2, p2.y + p2.size / 2);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Optional: Helper to draw a faint background grid
    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      
      ctx.beginPath();
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
    }

    // 3. Listeners
    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Start
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}