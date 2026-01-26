import { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let t = 0;

    function animate() {
      t += 0.01;

      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          const r = 150 + Math.sin(x * 0.01 + t) * 80;
          const g = 100 + Math.sin(y * 0.02 + t * 1.5) * 80;
          const b = 200 + Math.sin((x + y) * 0.02 - t) * 80;

          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(x, y, 4, 4);
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
