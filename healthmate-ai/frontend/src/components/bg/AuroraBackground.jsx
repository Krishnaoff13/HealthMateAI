import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let t = 0;

    function animate() {
      t += 0.02;

      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      g.addColorStop(0, `hsl(${(t * 40) % 360}, 70%, 55%)`);
      g.addColorStop(1, `hsl(${(t * 40 + 200) % 360}, 70%, 45%)`);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 0.3;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y = 300 + Math.sin(x * 0.01 + t) * 100;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = "cyan";
      ctx.fill();

      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
