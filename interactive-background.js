document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouseX = 0;
  let mouseY = 0;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  const particles = [];

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    addParticle(mouseX, mouseY);
  });

  function addParticle(x, y) {
    particles.push({
      x: x,
      y: y,
      radius: Math.random() * 6 + 4,
      alpha: 1,
      decay: 0.02,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = `rgba(${hslToRgb(p.color)},${p.alpha})`;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(draw);
  }

  function hslToRgb(hsl) {
    // Convert hsl string to rgb string
    const tempDiv = document.createElement('div');
    tempDiv.style.color = hsl;
    document.body.appendChild(tempDiv);
    const cs = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    const rgb = cs.match(/\d+/g);
    return rgb ? rgb.join(',') : '255,255,255';
  }

  draw();
});
