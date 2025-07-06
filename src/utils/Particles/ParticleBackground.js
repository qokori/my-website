import { useEffect } from "react";
import "./ParticleBackground.css";

const ParticleBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    initCanvas();

    let particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
        this.color = "rgba(100, 100, 100, 0.42)";
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Исправленная логика границ
        if (this.x >= canvas.width || this.x <= 0) {
          this.speedX *= -1;
          this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y >= canvas.height || this.y <= 0) {
          this.speedY *= -1;
          this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    let animationId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    // Обработчик изменения размера окна
    function handleResize() {
      initCanvas();
      particles.forEach((particle) => particle.reset());
    }

    window.addEventListener("resize", handleResize);

    initParticles();
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="particleCanvas" className="particle-canvas" />;
};

export default ParticleBackground;
