import { useEffect, useRef } from "react";

export default function WavesBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;

    function animate() {
      t += 0.003;

      const w = canvas.width;
      const h = canvas.height;

      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, `hsl(${(t * 80) % 360}, 70%, 55%)`);
      g.addColorStop(1, `hsl(${(t * 80 + 180) % 360}, 70%, 50%)`);

      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.moveTo(0, h * 0.7);

      for (let x = 0; x <= w; x++) {
        const y = h * 0.7 + Math.sin(x * 0.01 + t * 3) * 80;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.fill();

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
}
