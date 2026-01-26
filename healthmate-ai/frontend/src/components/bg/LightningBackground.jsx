import { useEffect, useRef } from "react";

export default function LightningBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    c.width = innerWidth;
    c.height = innerHeight;

    function createBolt() {
      const bolt = [];
      let x = Math.random() * c.width;
      let y = 0;

      for (let i = 0; i < 20; i++) {
        x += (Math.random() - 0.5) * 200;
        y += Math.random() * 50;

        bolt.push({ x, y });
      }

      return bolt;
    }

    let bolts = [];

    setInterval(() => bolts.push(createBolt()), 400);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, c.width, c.height);

      bolts.forEach((b, i) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,200,255,0.8)";
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "cyan";

        ctx.moveTo(b[0].x, b[0].y);
        for (let p of b) ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (b[b.length - 1].y > c.height) bolts.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
