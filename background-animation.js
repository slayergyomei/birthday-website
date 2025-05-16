// background-animation.js
// Implements smooth, dynamic floating orbs animation as background
// Also adds confetti animation for final.html page

(() => {
  const canvas = document.getElementById('background-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let width, height;
  let orbs = [];

  class Orb {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = 10 + Math.random() * 20;
      this.color = `rgba(106, 79, 255, ${0.1 + Math.random() * 0.3})`;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.phase = Math.random() * 2 * Math.PI;
      this.phaseSpeed = 0.02 + Math.random() * 0.02;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.phase += this.phaseSpeed;
      this.radius += Math.sin(this.phase) * 0.1;

      if (this.x < -this.radius) this.x = width + this.radius;
      else if (this.x > width + this.radius) this.x = -this.radius;
      if (this.y < -this.radius) this.y = height + this.radius;
      else if (this.y > height + this.radius) this.y = -this.radius;
    }

    draw(ctx) {
      const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.1, this.x, this.y, this.radius);
      gradient.addColorStop(0, this.color);
      gradient.addColorStop(1, 'rgba(106, 79, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function resize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function initOrbs(count) {
    orbs = [];
    for (let i = 0; i < count; i++) {
      orbs.push(new Orb());
    }
  }

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    orbs.forEach(orb => {
      orb.update();
      orb.draw(ctx);
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initOrbs(30);
  });

  // Initialize
  resize();
  initOrbs(30);
  animate();
})();

// Confetti animation for final.html
(() => {
  const confettiCanvas = document.getElementById('confetti-canvas');
  if (!confettiCanvas) return;
  const ctx = confettiCanvas.getContext('2d');
  let width, height;
  let confettiPieces = [];

  class Confetti {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height;
      this.size = 5 + Math.random() * 10;
      this.speedY = 1 + Math.random() * 3;
      this.speedX = (Math.random() - 0.5) * 2;
      this.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
      this.tilt = Math.random() * 10 - 10;
      this.tiltSpeed = Math.random() * 0.1 + 0.05;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.tilt += this.tiltSpeed;
      if (this.y > height) {
        this.x = Math.random() * width;
        this.y = -this.size;
      }
      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.lineWidth = this.size / 2;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt, this.y);
      ctx.lineTo(this.x, this.y + this.tilt + this.size / 2);
      ctx.stroke();
    }
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    confettiCanvas.width = width;
    confettiCanvas.height = height;
  }

  function initConfetti(count) {
    confettiPieces = [];
    for (let i = 0; i < count; i++) {
      confettiPieces.push(new Confetti());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    confettiPieces.forEach(piece => {
      piece.update();
      piece.draw(ctx);
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initConfetti(100);
  });

  // Initialize
  resize();
  initConfetti(100);
  animate();
})();
