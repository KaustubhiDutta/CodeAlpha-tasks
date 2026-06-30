import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

const WorldClassBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);

  // Node class - represents AI knowledge nodes
  class Node {
    constructor(canvas, depth) {
      this.canvas = canvas;
      this.depth = depth || Math.random();
      this.reset();
    }

    reset() {
      const margin = 100;
      this.x = Math.random() * (this.canvas.width - margin * 2) + margin;
      this.y = Math.random() * (this.canvas.height - margin * 2) + margin;
      this.radius = this.depth * 2.5 + 1.5;
      this.baseRadius = this.radius;
      
      // Movement properties
      this.angle = Math.random() * Math.PI * 2;
      this.orbitRadius = Math.random() * 80 + 20;
      this.orbitSpeed = (Math.random() - 0.5) * 0.003;
      this.driftX = (Math.random() - 0.5) * 0.3;
      this.driftY = (Math.random() - 0.5) * 0.3;
      
      // Visual properties
      this.opacity = 0.3 + this.depth * 0.5;
      this.pulseSpeed = 0.01 + Math.random() * 0.02;
      this.pulseOffset = Math.random() * Math.PI * 2;
      
      // Constellation properties
      this.constellationGroup = Math.floor(Math.random() * 5);
      this.brightness = 0.5 + Math.random() * 0.5;
    }

    update(mouseX, mouseY, time) {
      // Orbital movement
      this.angle += this.orbitSpeed;
      this.x += Math.cos(this.angle) * 0.2 + this.driftX;
      this.y += Math.sin(this.angle) * 0.2 + this.driftY;

      // Wrap around with padding
      const padding = 50;
      if (this.x < -padding) this.x = this.canvas.width + padding;
      if (this.x > this.canvas.width + padding) this.x = -padding;
      if (this.y < -padding) this.y = this.canvas.height + padding;
      if (this.y > this.canvas.height + padding) this.y = -padding;

      // Mouse interaction - magnetic effect with spring physics
      if (mouseX && mouseY) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 250) {
          // Spring-like attraction
          const springForce = 0.08;
          const targetX = mouseX + (this.x - mouseX) * 0.3;
          const targetY = mouseY + (this.y - mouseY) * 0.3;
          
          this.x += (targetX - this.x) * springForce * (1 - distance / 300);
          this.y += (targetY - this.y) * springForce * (1 - distance / 300);
          
          // Glow intensification
          this.brightness = Math.min(1.5, 0.8 + (1 - distance / 250) * 1.2);
          
          // Radius pulsing
          this.radius = this.baseRadius * (1 + (1 - distance / 250) * 0.6);
        } else {
          // Return to base brightness
          this.brightness = 0.5 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
          this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
        }
      } else {
        // Ambient pulsing
        this.brightness = 0.5 + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
        this.radius = this.baseRadius + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3;
      }
    }

    draw(ctx, time) {
      const glowIntensity = this.brightness * 0.8;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 4
      );
      
      const alpha = this.opacity * this.brightness * 0.6;
      gradient.addColorStop(0, `rgba(99, 102, 241, ${alpha * 0.8})`);
      gradient.addColorStop(0.3, `rgba(139, 92, 246, ${alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      
      ctx.shadowColor = `rgba(99, 102, 241, ${alpha * 0.3})`;
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.shadowColor = `rgba(139, 92, 246, ${alpha * 0.5})`;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      
      const coreAlpha = 0.6 + this.brightness * 0.4;
      ctx.fillStyle = `rgba(99, 102, 241, ${coreAlpha * 0.8})`;
      ctx.fill();

      // Inner bright core
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
      ctx.fill();
      
      ctx.shadowBlur = 0;
    }
  }

  // Initialize nodes
  const initNodes = useCallback((canvas) => {
    const nodeCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particlesRef.current = [];
    for (let i = 0; i < nodeCount; i++) {
      const depth = Math.random();
      particlesRef.current.push(new Node(canvas, depth));
    }
  }, []);

  // Draw connections between nodes
  const drawConnections = useCallback((ctx, nodes, mouseX, mouseY, time) => {
    const maxDistance = 150;
    const mouseMaxDistance = 200;
    
    // Node to node connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15 * 
            ((nodes[i].brightness + nodes[j].brightness) / 2);
          
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          
          ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.shadowColor = `rgba(99, 102, 241, ${opacity * 0.2})`;
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Mouse connections - creating a constellation around cursor
    if (mouseX && mouseY) {
      let connections = 0;
      const maxMouseConnections = 12;
      
      // Sort nodes by distance to mouse
      const sortedNodes = [...nodes]
        .map((node, index) => ({
          node,
          index,
          distance: Math.sqrt(
            Math.pow(node.x - mouseX, 2) + 
            Math.pow(node.y - mouseY, 2)
          )
        }))
        .sort((a, b) => a.distance - b.distance);

      // Draw connections to nearest nodes
      for (let i = 0; i < Math.min(sortedNodes.length, maxMouseConnections); i++) {
        const { node, distance } = sortedNodes[i];
        
        if (distance < mouseMaxDistance) {
          const opacity = (1 - distance / mouseMaxDistance) * 0.4;
          const pulse = Math.sin(time * 0.002 + i) * 0.2 + 0.8;
          
          // Gradient line from mouse to node
          const gradient = ctx.createLinearGradient(mouseX, mouseY, node.x, node.y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.6 * pulse})`);
          gradient.addColorStop(0.5, `rgba(99, 102, 241, ${opacity * 0.4 * pulse})`);
          gradient.addColorStop(1, `rgba(99, 102, 241, ${opacity * 0.2 * pulse})`);
          
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2 * pulse;
          ctx.shadowColor = `rgba(139, 92, 246, ${opacity * 0.3})`;
          ctx.shadowBlur = 15;
          ctx.stroke();
          ctx.shadowBlur = 0;
          connections++;
        }
      }

      // Mouse glow - multi-layered aurora
      const glowLayers = [
        { radius: 180, alpha: 0.06, color: '99, 102, 241' },
        { radius: 120, alpha: 0.08, color: '139, 92, 246' },
        { radius: 60, alpha: 0.12, color: '99, 102, 241' },
      ];
      
      glowLayers.forEach((layer, idx) => {
        const pulse = Math.sin(time * 0.001 + idx * 2) * 0.5 + 0.5;
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, layer.radius
        );
        gradient.addColorStop(0, `rgba(${layer.color}, ${layer.alpha * (1 + pulse * 0.3)})`);
        gradient.addColorStop(0.5, `rgba(${layer.color}, ${layer.alpha * 0.5 * (1 + pulse * 0.2)})`);
        gradient.addColorStop(1, `rgba(${layer.color}, 0)`);
        
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, layer.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Compass ring around cursor
      const ringRadius = 70 + Math.sin(time * 0.0015) * 15;
      const ringPulse = Math.sin(time * 0.002) * 0.3 + 0.7;
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * ringPulse})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = `rgba(99, 102, 241, ${0.1 * ringPulse})`;
      ctx.shadowBlur = 20;
      ctx.setLineDash([6, 10]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // Inner compass ring
      const innerRadius = 30 + Math.sin(time * 0.002 + 1) * 10;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, innerRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * ringPulse})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Compass cardinal points
      const cardinalPoints = [
        { angle: 0, label: 'N' },
        { angle: Math.PI / 2, label: 'E' },
        { angle: Math.PI, label: 'S' },
        { angle: 3 * Math.PI / 2, label: 'W' }
      ];
      
      const compassSize = 85 + Math.sin(time * 0.001) * 5;
      ctx.fillStyle = `rgba(99, 102, 241, ${0.2 * ringPulse})`;
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      cardinalPoints.forEach((point) => {
        const x = mouseX + Math.cos(point.angle) * compassSize;
        const y = mouseY + Math.sin(point.angle) * compassSize;
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${0.15 * ringPulse})`;
        ctx.fill();
        
        ctx.fillStyle = `rgba(99, 102, 241, ${0.2 * ringPulse})`;
        ctx.fillText(point.label, x, y + 16);
      });
    }
  }, []);

  // Draw aurora background
  const drawAurora = useCallback((ctx, width, height, time, mouseX, mouseY) => {
    // Base gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(249, 250, 251, 0.98)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.7, 'rgba(238, 242, 255, 0.98)');
    gradient.addColorStop(1, 'rgba(249, 250, 251, 0.98)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Aurora waves - subtle flowing gradients
    const auroraColors = [
      { r: 99, g: 102, b: 241, alpha: 0.03 },
      { r: 139, g: 92, b: 246, alpha: 0.025 },
      { r: 6, g: 182, b: 212, alpha: 0.02 },
    ];

    auroraColors.forEach((color, idx) => {
      const offset = idx * 0.3;
      const yOffset = Math.sin(time * 0.0002 + offset) * height * 0.15;
      const xOffset = Math.cos(time * 0.00015 + offset * 0.7) * width * 0.1;
      
      // Mouse distortion
      const mouseDistortionX = mouseX ? (mouseX - width / 2) * 0.05 : 0;
      const mouseDistortionY = mouseY ? (mouseY - height / 2) * 0.05 : 0;
      
      const gradient = ctx.createRadialGradient(
        width * 0.3 + xOffset + mouseDistortionX,
        height * 0.2 + yOffset + mouseDistortionY,
        50,
        width * 0.5 + xOffset * 0.5 + mouseDistortionX * 0.5,
        height * 0.5 + yOffset * 0.5 + mouseDistortionY * 0.5,
        Math.max(width, height) * 0.7
      );
      
      const alpha = color.alpha * (1 + Math.sin(time * 0.0003 + offset) * 0.3);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.8})`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.4})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const time = Date.now();
    timeRef.current = time;

    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    // Draw aurora background
    drawAurora(ctx, width, height, time, mouseX, mouseY);

    // Update and draw nodes
    particlesRef.current.forEach(node => {
      node.update(mouseX, mouseY, time);
      node.draw(ctx, time);
    });

    // Draw connections
    drawConnections(ctx, particlesRef.current, mouseX, mouseY, time);

    animationRef.current = requestAnimationFrame(animate);
  }, [mousePosition, drawAurora, drawConnections]);

  // Handle mouse events
  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  // Setup canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect() || { 
        width: window.innerWidth, 
        height: window.innerHeight 
      };
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      
      initNodes(canvas);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    const canvasElement = canvas;
    canvasElement.addEventListener('mousemove', handleMouseMove);
    canvasElement.addEventListener('mouseenter', handleMouseEnter);
    canvasElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvasElement.removeEventListener('mousemove', handleMouseMove);
      canvasElement.removeEventListener('mouseenter', handleMouseEnter);
      canvasElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animate, handleMouseMove, handleMouseEnter, handleMouseLeave, initNodes]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-default"
        style={{ 
          display: 'block',
          willChange: 'transform',
        }}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-50/5 via-transparent to-purple-50/5" />
    </div>
  );
};

export default WorldClassBackground;