// script.js – Birthday wishing site functionality

// Confetti implementation (lightweight version)
class ConfettiParticle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.reset();
  }
  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * -this.canvasHeight;
    this.radius = Math.random() * 3 + 2;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }
  update() {
    this.y += this.speed;
    this.x += Math.cos(this.angle) * 0.5;
    if (this.y > this.canvasHeight) this.reset();
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

function launchConfetti(duration = 3000) {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  const count = 150;
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  for (let i = 0; i < count; i++) particles.push(new ConfettiParticle(ctx, canvas.width, canvas.height));

  let start = null;
  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(animate);
  window.addEventListener('resize', resize);
}

// Greeting logic
document.getElementById('wishBtn').addEventListener('click', () => {
  const name = document.getElementById('nameInput').value.trim();
  const greetingEl = document.getElementById('personalGreeting');
  if (name) {
    greetingEl.textContent = `Happy Birthday, ${name}! 🎂`;
    launchConfetti();
  } else {
    greetingEl.textContent = 'Please enter a name!';
  }
});

// Allow pressing Enter to trigger the wish
document.getElementById('nameInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    document.getElementById('wishBtn').click();
  }
});