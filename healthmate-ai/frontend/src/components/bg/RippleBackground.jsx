import { useEffect, useRef } from "react";

export default function RippleBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ripples = [];

    window.addEventListener("mousemove", (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0
      });
    });

    function animate() {
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((r, i) => {
        r.r += 2;
        ctx.strokeStyle = `rgba(0,200,255,${1 - r.r / 300})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();

        if (r.r > 300) ripples.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
