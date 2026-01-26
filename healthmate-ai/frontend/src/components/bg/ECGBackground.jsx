import { useEffect, useRef } from "react";

export default function ECGBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let x = 0;

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = "#00ff99";
      ctx.lineWidth = 2;

      for (let i = 0; i < canvas.width; i++) {
        const y =
          canvas.height / 2 +
          Math.sin((i + x) * 0.02) * 20 +
          (i % 200 === 0 ? -60 : 0);
        ctx.lineTo(i, y);
      }

      ctx.stroke();
      x += 2;

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    />
  );
}
