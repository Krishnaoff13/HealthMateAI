import { useEffect, useRef } from "react";

export default function FogBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    c.width = innerWidth;
    c.height = innerHeight;

    const fogLayers = [];
    for (let i = 0; i < 5; i++) {
      fogLayers.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.3 + 0.2,
        size: Math.random() * 400 + 300,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, c.width, c.height);

      fogLayers.forEach((f) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${f.opacity})`;
        ctx.filter = "blur(80px)";
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();

        f.x += f.speed;
        if (f.x - f.size > c.width) f.x = -f.size;
      });

      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
