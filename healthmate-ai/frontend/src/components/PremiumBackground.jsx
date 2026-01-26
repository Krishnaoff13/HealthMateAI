import { useEffect, useRef } from "react";

export default function PremiumBackground() {
  const bgRef = useRef(null);
  const ringsRef = useRef(null);

  useEffect(() => {
    startBackground();
    startRings();
  }, []);

  function startBackground() {
    const canvas = bgRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const shapes = ["circle", "triangle", "square"];
    const particles = [];
    const count = 90;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.depth = Math.random() * 3 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.size = Math.random() * 2 + 1;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
      }

      update() {
        this.angle += 0.002 * this.depth;
        this.x += Math.cos(this.angle) * 0.4 * this.depth;
        this.y += Math.sin(this.angle) * 0.4 * this.depth;

        // parallax effect
        this.x += (mouse.x - width / 2) * 0.0002 * this.depth;
        this.y += (mouse.y - height / 2) * 0.0002 * this.depth;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
          this.reset();
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = `rgba(255,255,255,0.4)`;
        ctx.lineWidth = 1.2;

        if (this.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, this.size * this.depth, 0, Math.PI * 2);
          ctx.stroke();
        } else if (this.shape === "triangle") {
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 2);
          ctx.lineTo(this.size * 2, this.size * 2);
          ctx.lineTo(-this.size * 2, this.size * 2);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.strokeRect(
            -this.size * 2,
            -this.size * 2,
            this.size * 4,
            this.size * 4
          );
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    let shift = 0;

    function animate() {
      shift += 0.002;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsl(${(shift * 80) % 360}, 70%, 45%)`);
      gradient.addColorStop(1, `hsl(${(shift * 80 + 180) % 360}, 70%, 45%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => (p.update(), p.draw()));

      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  function startRings() {
    const canvas = ringsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let angle = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, 200 + i * 40, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,255,255,${0.2 + i * 0.05})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "cyan";
        ctx.stroke();
      }

      ctx.restore();

      angle += 0.002;
      requestAnimationFrame(animate);
    }

    animate();
  }

  return (
    <>
      <canvas
        ref={bgRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -3,
        }}
      />
      <canvas
        ref={ringsRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      />
    </>
  );
}
