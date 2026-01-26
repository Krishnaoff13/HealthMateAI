import { useEffect, useRef } from "react";

export default function BlobsBackground() {
  const ref = useRef();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    const blobs = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 200 + 150,
      s: Math.random() * 0.5 + 0.2,
      c: `hsla(${Math.random() * 360}, 70%, 60%, 0.4)`
    }));

    function animate() {
      ctx.clearRect(0, 0, c.width, c.height);

      blobs.forEach((b, i) => {
        ctx.beginPath();
        ctx.fillStyle = b.c;
        ctx.arc(
          b.x + Math.sin(Date.now() * 0.0003 + i) * 50,
          b.y + Math.cos(Date.now() * 0.0004 + i) * 50,
          b.r,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

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
        zIndex: -1
      }}
    />
  );
}
