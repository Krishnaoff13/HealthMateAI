import { useEffect, useRef } from "react";

export default function AIHealthNetworkBackground() {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    // Number of nodes
    const NODE_COUNT = 80;

    // Create nodes
    const nodes = Array.from({ length: NODE_COUNT }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 3 + 2,
    }));

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);

      // Background (Health blue)
      const gradient = ctx.createLinearGradient(0, 0, c.width, c.height);
      gradient.addColorStop(0, "#001f33");
      gradient.addColorStop(1, "#003355");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, c.width, c.height);

      // Draw connections
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only draw if close enough
          if (dist < 170) {
            const opacity = 1 - dist / 170;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 180, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "cyan";
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.fillStyle = "cyan";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "cyan";
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Movement
        n.x += n.vx;
        n.y += n.vy;

        // Bounce off edges
        if (n.x < 0 || n.x > c.width) n.vx *= -1;
        if (n.y < 0 || n.y > c.height) n.vy *= -1;
      });

      requestAnimationFrame(draw);
    }

    draw();

    // Resize handler
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
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        background: "#002244",
      }}
    />
  );
}
