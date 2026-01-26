import { useEffect, useRef } from "react";

export default function BrainPulseBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let radius = 0;

    function animate() {
      ctx.fillStyle = "rgba(4,8,15,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, radius + i * 60, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,200,${0.3 - i * 0.05})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#00ffd5";
        ctx.stroke();
      }

      ctx.restore();

      radius += 1.2;
      if (radius > Math.max(canvas.width, canvas.height)) {
        radius = 0;
      }

      requestAnimationFrame(animate);
    }

    animate();

    window.onresize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "#05080f",
      }}
    />
  );
}
ECGBackground.jsx