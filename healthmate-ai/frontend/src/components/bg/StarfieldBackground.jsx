import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 300 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 3 + 1
    }));

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((s) => {
        s.x -= s.z;

        if (s.x < 0) {
          s.x = canvas.width;
          s.y = Math.random() * canvas.height;
        }

        ctx.fillStyle = "white";
        ctx.fillRect(s.x, s.y, s.z, s.z);
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
