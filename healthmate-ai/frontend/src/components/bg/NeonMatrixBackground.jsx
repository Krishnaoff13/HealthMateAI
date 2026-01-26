import { useEffect, useRef } from "react";

export default function NeonMatrixBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const size = 30;
    let t = 0;

    function animate() {
      t += 0.03;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < canvas.height; y += size) {
        for (let x = 0; x < canvas.width; x += size) {
          const glow = Math.sin((x + y) * 0.02 + t) * 100 + 155;
          ctx.fillStyle = `rgb(0,${glow},${glow * 1.2})`;
          ctx.fillRect(x, y, 2, 2);
        }
      }

      ctx.fillStyle = "rgba(0,255,255,0.15)";
      ctx.fillRect(0, Math.sin(t) * canvas.height * 0.5 + canvas.height * 0.25, canvas.width, 40);

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: -1 }} />;
}
