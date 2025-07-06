import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  useEffect(() => {
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    // Инициализация размеров
    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    initCanvas();

    let particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = "rgba(100, 100, 100, 0.42)";
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
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
    const fps = 30;
    let lastRender = 0;

    function animate(timestamp) {
      if (timestamp - lastRender >= 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
          particle.update();
          particle.draw();
        }

        lastRender = timestamp;
      }
      animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!animationId) {
        lastRender = performance.now();
        animate(lastRender);
      }
    }

    initParticles();
    startAnimation();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="App">
      <canvas id="particleCanvas"></canvas>
      <div className="content">
        <div className="hi">
          <h1>Hi,</h1>
          <h1>I'm qokori</h1>
        </div>
        <div className="desc">
          <p>Alabuga Polytech student, web developer</p>
        </div>
        <section className="socials">
          <p>My socials</p>
          <div className="links">
            <a
              href="https://github.com/qokori"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <a
              href="https://t.me/qokori"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              href="https://ko-fi.com/qokori"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ko-Fi
            </a>
            <a
              href="https://boosty.to/qokori"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boosty
            </a>
          </div>
        </section>
        <section className="projects">
          <p>My projects</p>
          <div className="pro-links">
            <a
              href="https://osutyumencup.ru"
              target="_blank"
              rel="noopener noreferrer"
            >
              OTC-Website
            </a>
            <a
              href="https://boosty.to/pineapplekey"
              target="_blank"
              rel="noopener noreferrer"
            >
              PineappleKey
            </a>
          </div>
        </section>
      </div>
      <div className="authority">
        <p>qokori.space 2025</p>
      </div>
    </div>
  );
}

export default App;
