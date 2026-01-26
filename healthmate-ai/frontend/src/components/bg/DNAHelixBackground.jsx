import { useEffect, useRef } from "react";

export default function DNAHelixBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let t = 0;

    function draw() {
      ctx.fillStyle = "#001f33";
      ctx.fillRect(0, 0, c.width, c.height);

      t += 0.03;

      const centerX = c.width / 2;
      const centerY = c.height / 2;

      for (let i = -40; i < 40; i++) {
        const y = centerY + i * 12;
        const x1 = centerX + Math.sin(i * 0.25 + t) * 120;
        const x2 = centerX - Math.sin(i * 0.25 + t) * 120;

        // Dots on helix
        ctx.beginPath();
        ctx.fillStyle = "cyan";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "cyan";
        ctx.arc(x1, y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "#66ffff";
        ctx.arc(x2, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Connect the strands
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = "rgba(0,255,255,0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}
