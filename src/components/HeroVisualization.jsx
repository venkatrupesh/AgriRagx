import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Animated node-based visualization for the hero section
const NODES = [
  { label: 'Crop', x: 0.5, y: 0.3, size: 28 },
  { label: 'Soil', x: 0.18, y: 0.45, size: 22 },
  { label: 'Weather', x: 0.82, y: 0.4, size: 22 },
  { label: 'Disease', x: 0.25, y: 0.7, size: 22 },
  { label: 'Yield', x: 0.75, y: 0.68, size: 22 },
  { label: 'AI', x: 0.5, y: 0.55, size: 32 },
  { label: 'Knowledge', x: 0.35, y: 0.85, size: 20 },
  { label: 'Prediction', x: 0.65, y: 0.88, size: 20 },
];

const CONNECTIONS = [
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5],
  [5, 6], [5, 7], [1, 3], [2, 4], [6, 7],
  [0, 1], [0, 2],
];

export default function HeroVisualization() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Floating particles
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }));

    const animate = () => {
      timeRef.current += 0.008;
      const t = timeRef.current;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(74, 222, 128, ${p.opacity})`
          : `rgba(22, 163, 74, ${p.opacity})`;
        ctx.fill();
      });

      // Compute animated node positions
      const nodes = NODES.map((n, i) => ({
        ...n,
        px: n.x * w + Math.sin(t + i * 0.7) * 8,
        py: n.y * h + Math.cos(t + i * 0.5) * 6,
      }));

      // Draw connections
      CONNECTIONS.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const gradient = ctx.createLinearGradient(na.px, na.py, nb.px, nb.py);
        const alpha = 0.08 + Math.sin(t * 0.5) * 0.04;
        gradient.addColorStop(0, isDark ? `rgba(74, 222, 128, ${alpha})` : `rgba(22, 163, 74, ${alpha})`);
        gradient.addColorStop(1, isDark ? `rgba(34, 211, 238, ${alpha})` : `rgba(6, 182, 212, ${alpha})`);
        ctx.beginPath();
        ctx.moveTo(na.px, na.py);
        ctx.lineTo(nb.px, nb.py);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pulse dot along connection
        const pulse = (Math.sin(t * 1.5 + a + b) + 1) / 2;
        const dotX = na.px + (nb.px - na.px) * pulse;
        const dotY = na.py + (nb.py - na.py) * pulse;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(74, 222, 128, 0.4)` : `rgba(22, 163, 74, 0.3)`;
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((n) => {
        // Glow
        const glow = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, n.size * 2);
        glow.addColorStop(0, isDark ? 'rgba(74, 222, 128, 0.15)' : 'rgba(22, 163, 74, 0.1)');
        glow.addColorStop(1, 'rgba(74, 222, 128, 0)');
        ctx.beginPath();
        ctx.arc(n.px, n.py, n.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(n.px, n.py, n.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(74, 222, 128, 0.2)' : 'rgba(22, 163, 74, 0.15)';
        ctx.fill();
        ctx.strokeStyle = isDark ? 'rgba(74, 222, 128, 0.5)' : 'rgba(22, 163, 74, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.font = `${n.size <= 20 ? 10 : n.size <= 22 ? 11 : 13}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isDark ? 'rgba(226, 232, 240, 0.8)' : 'rgba(30, 41, 59, 0.7)';
        ctx.fillText(n.label, n.px, n.py + n.size / 2 + 14);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-label="Agricultural AI network visualization"
    />
  );
}
