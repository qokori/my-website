document.addEventListener("DOMContentLoaded", () => {
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

  // Оптимизация анимации
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

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  // Инициализация
  initParticles();
  startAnimation();

  // Обработчики событий
  window.addEventListener("resize", () => {
    stopAnimation();
    initCanvas();
    initParticles();
    startAnimation();
  });

  // Остановка анимации при скрытии вкладки
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAnimation();
    } else {
      startAnimation();
    }
  });
});
