import { useEffect, useRef } from "react";

export default function HealingWavesBackground() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    let t = 0;

    function animate() {
      t += 0.01;

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#0a3d62");
      gradient.addColorStop(1, "#3c6382");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.lineWidth = 2;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();

        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin((x * 0.003) + t + i) * (30 + i * 15);

          ctx.lineTo(x, y);
        }
        ctx.stroke();
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
      ref={ref}
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
