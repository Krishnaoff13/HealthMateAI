import { useEffect, useRef } from "react";

export default function GeometricBackground() {
  const ref = useRef();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const shapes = [];
    const types = ["triangle", "square", "circle"];

    for (let i = 0; i < 50; i++) {
      shapes.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        s: Math.random() * 40 + 20,
        a: Math.random() * Math.PI * 2,
        t: types[Math.floor(Math.random() * types.length)],
        d: Math.random() * 1 + 0.3
      });
    }

    function animate() {
      ctx.clearRect(0, 0, c.width, c.height);

      shapes.forEach((p) => {
        p.a += 0.005;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);

        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2;

        if (p.t === "square") {
          ctx.strokeRect(-p.s / 2, -p.s / 2, p.s, p.s);
        } else if (p.t === "triangle") {
          ctx.beginPath();
          ctx.moveTo(0, -p.s);
          ctx.lineTo(p.s, p.s);
          ctx.lineTo(-p.s, p.s);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.s / 2, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />
  );
}
