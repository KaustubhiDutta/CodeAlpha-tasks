import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const FlightPath = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Flight routes data
    const flightRoutes = [
      { from: { x: 0.1, y: 0.3 }, to: { x: 0.3, y: 0.2 }, color: '#0ea5e9', name: 'NYC → LON' },
      { from: { x: 0.3, y: 0.2 }, to: { x: 0.55, y: 0.15 }, color: '#14b8a6', name: 'LON → PAR' },
      { from: { x: 0.55, y: 0.15 }, to: { x: 0.75, y: 0.25 }, color: '#8b5cf6', name: 'PAR → DXB' },
      { from: { x: 0.75, y: 0.25 }, to: { x: 0.85, y: 0.45 }, color: '#f59e0b', name: 'DXB → BKK' },
      { from: { x: 0.85, y: 0.45 }, to: { x: 0.7, y: 0.65 }, color: '#ef4444', name: 'BKK → SYD' },
      { from: { x: 0.7, y: 0.65 }, to: { x: 0.4, y: 0.7 }, color: '#10b981', name: 'SYD → CPT' },
      { from: { x: 0.4, y: 0.7 }, to: { x: 0.2, y: 0.55 }, color: '#ec4899', name: 'CPT → RIO' },
      { from: { x: 0.2, y: 0.55 }, to: { x: 0.1, y: 0.3 }, color: '#06b6d4', name: 'RIO → NYC' },
    ];

    let animationFrame;
    let startTime = Date.now();

    // Draw curved flight path
    const drawCurvedPath = (from, to, progress, color, width = 2) => {
      const x1 = from.x * canvas.width;
      const y1 = from.y * canvas.height;
      const x2 = to.x * canvas.width;
      const y2 = to.y * canvas.height;
      
      // Control point for curve (makes the arc)
      const midX = (x1 + x2) / 2;
const midY = Math.min(y1, y2) - 12;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.setLineDash([5, 10]);
      ctx.stroke();
      
      // Draw dashed line animation
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(midX, midY, x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = width + 1;
      ctx.setLineDash([20, 40]);
      ctx.lineDashOffset = -progress * 60;
      ctx.stroke();
      
      ctx.setLineDash([]);
      return { midX, midY };
    };

    // Draw airplane at position
    const drawAirplane = (x, y, rotation, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      
      // Draw airplane body
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-10, -5);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-10, 5);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw wings
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(-8, -8);
      ctx.lineTo(-5, -3);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.lineTo(-8, 8);
      ctx.lineTo(-5, 3);
      ctx.fill();
      
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    // Draw airport markers
    const drawAirport = (x, y, name, color) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Pulsing ring
      const time = Date.now() / 1000;
      const pulse = Math.sin(time * 3) * 2;
      ctx.beginPath();
      ctx.arc(x, y, 12 + pulse, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Airport label
      ctx.font = 'bold 10px "Inter"';
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'black';
      ctx.fillText(name, x + 10, y - 5);
      ctx.shadowBlur = 0;
    };

    // Draw flight path trail (glow effect)
    const drawTrail = (from, to, progress, color) => {
      const x1 = from.x * canvas.width;
      const y1 = from.y * canvas.height;
      const x2 = to.x * canvas.width;
      const y2 = to.y * canvas.height;
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2 - 50;
      
      // Calculate position along curve
      const t = progress;
      const x = Math.pow(1-t, 2) * x1 + 2 * (1-t) * t * midX + Math.pow(t, 2) * x2;
      const y = Math.pow(1-t, 2) * y1 + 2 * (1-t) * t * midY + Math.pow(t, 2) * y2;
      
      // Draw glow trail
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(x - i * 3, y - i * 2, 3 - i * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(40 - i * 8).toString(16)}`;
        ctx.fill();
      }
      
      return { x, y };
    };

    // Main animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const elapsed = (Date.now() - startTime) / 1000;
      
      // Draw each flight route
      flightRoutes.forEach((route, index) => {
        const routeProgress = (elapsed * 0.2 + index * 0.1) % 1;
        
        // Draw the path
        drawCurvedPath(route.from, route.to, routeProgress, route.color, 1.5);
        
        // Draw airports at endpoints
        const fromX = route.from.x * canvas.width;
        const fromY = route.from.y * canvas.height;
        const toX = route.to.x * canvas.width;
        const toY = route.to.y * canvas.height;
        
        drawAirport(fromX, fromY, route.name.split('→')[0], route.color);
        drawAirport(toX, toY, route.name.split('→')[1], route.color);
        
        // Draw moving airplane
        const { x: planeX, y: planeY } = drawTrail(route.from, route.to, routeProgress, route.color);
        
        // Calculate rotation angle for airplane
        const x1 = route.from.x * canvas.width;
        const y1 = route.from.y * canvas.height;
        const x2 = route.to.x * canvas.width;
        const y2 = route.to.y * canvas.height;
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2 - 50;
        
        // Get slope for rotation
        const nextT = Math.min(routeProgress + 0.05, 1);
        const nextX = Math.pow(1-nextT, 2) * x1 + 2 * (1-nextT) * nextT * midX + Math.pow(nextT, 2) * x2;
        const nextY = Math.pow(1-nextT, 2) * y1 + 2 * (1-nextT) * nextT * midY + Math.pow(nextT, 2) * y2;
        
        const angle = Math.atan2(nextY - planeY, nextX - planeX);
        drawAirplane(planeX, planeY, angle, route.color);
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default FlightPath;