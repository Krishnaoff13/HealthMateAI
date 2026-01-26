import { useEffect, useRef } from "react";

export default function HealingWavesBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#050a14";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120,180,255,${0.15 - i * 0.03})`;
        ctx.lineWidth = 120;
        ctx.filter = "blur(20px)";

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.004 + t + i) * 60;
          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      ctx.filter = "none";
      t += 0.01;
      requestAnimationFrame(animate);
    }

    animate();

    window.onresize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
