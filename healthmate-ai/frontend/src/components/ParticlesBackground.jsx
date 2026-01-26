import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 3 + 1;
        this.radius = Math.random() * 2.5 + 1;
        this.angle = Math.random() * Math.PI * 2;          // For circular drift
        this.speed = (Math.random() * 0.4 + 0.1) * this.z; // Depth-based speed
      }

      update() {
        // Smooth drifting movement
        this.angle += 0.002 * this.z;
        this.x += Math.cos(this.angle) * 0.4 * this.z;
        this.y += Math.sin(this.angle) * 0.4 * this.z;

        // Wrap around screen
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(
          this.x,
          this.y,
          this.radius * (this.z / 2),
          0,
          Math.PI * 2
        );

        const glow = 0.4 + Math.sin(this.angle * 3) * 0.2;

        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.shadowBlur = 15 * (this.z / 2);
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      // Background animated gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f0c29");
      gradient.addColorStop(0.5, "#302b63");
      gradient.addColorStop(1, "#24243e");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
