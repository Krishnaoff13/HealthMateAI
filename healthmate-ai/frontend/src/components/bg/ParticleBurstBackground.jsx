import { useEffect, useRef } from "react";

export default function ParticleBurstBackground() {
  const ref = useRef();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");

    c.width = innerWidth;
    c.height = innerHeight;

    const particles = [];

    function spawnBurst() {
      const burstX = Math.random() * c.width;
      const burstY = Math.random() * c.height;

      for (let i = 0; i < 40; i++) {
        particles.push({
          x: burstX,
          y: burstY,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 3 + 1,
          size: Math.random() * 3 + 1,
          life: 100 + Math.random() * 50,
          color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        });
      }
    }

    setInterval(spawnBurst, 800);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
