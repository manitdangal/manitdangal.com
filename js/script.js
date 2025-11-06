// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Mobile menu
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
const trailSpeed = 0.15;

// Cursor trail particles
const trailParticles = [];
const maxTrailParticles = 8;

function createTrailParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'cursor-trail';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 300);
  
  return particle;
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
  
  // Create trail particles
  if (Math.random() > 0.7) {
    createTrailParticle(mouseX, mouseY);
  }
});

// Smooth trail following
function animateTrail() {
  trailX += (mouseX - trailX) * trailSpeed;
  trailY += (mouseY - trailY) * trailSpeed;
  
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .social-card, .symphony-item');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hover');
  });
});

// IntersectionObserver for reveals
const revealEls = Array.from(document.querySelectorAll('.reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => io.observe(el));

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  initParticles();
}

window.addEventListener('resize', resize);

function initParticles() {
  const count = Math.min(150, Math.floor(width * height / 15000));
  particles = new Array(count).fill(0).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 2 + 0.5,
    c: Math.random() > 0.66 ? 'rgba(124, 124, 255, 0.4)' : 
        (Math.random() > 0.33 ? 'rgba(117, 224, 214, 0.4)' : 'rgba(255, 139, 209, 0.4)')
  }));
}

function step() {
  ctx.clearRect(0, 0, width, height);
  
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.x < -10) p.x = width + 10;
    if (p.x > width + 10) p.x = -10;
    if (p.y < -10) p.y = height + 10;
    if (p.y > height + 10) p.y = -10;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    
    // Glow effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.c;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  
  requestAnimationFrame(step);
}

resize();
step();

// Mouse parallax
const layers = Array.from(document.querySelectorAll('.layer'));
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) - 0.5;
  const y = (e.clientY / window.innerHeight) - 0.5;
  
  layers.forEach(l => {
    const d = parseFloat(l.dataset.depth || '0.1');
    l.style.transform = `translate(${x * d * 50}px, ${y * d * 50}px)`;
  });
});

// 3D Tilt Effect on Project Cards
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      nav.classList.remove('active');
    }
  });
});

// Form handling
const form = document.getElementById('message-form');
const statusEl = document.querySelector('.form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    statusEl.textContent = 'Please fill in all fields ✨';
    statusEl.style.color = 'var(--accent-3)';
    return;
  }
  
  statusEl.textContent = 'Sending…';
  statusEl.style.color = 'var(--accent-2)';
  
  setTimeout(() => {
    statusEl.textContent = 'Message sent! (This is a demo — no backend yet)';
    statusEl.style.color = 'var(--accent-2)';
    form.reset();
    
    // Reset label positions
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
      label.style.top = '50%';
      label.style.transform = 'translateY(-50%)';
      label.style.fontSize = '16px';
      label.style.color = 'var(--text-3)';
    });
    
    const textareaLabel = form.querySelector('textarea + label');
    if (textareaLabel) {
      textareaLabel.style.top = '22px';
      textareaLabel.style.transform = 'none';
    }
  }, 1000);
});

// Add smooth page transitions
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease-out';
    document.body.style.opacity = '1';
  }, 100);
});

// Parallax scroll effect for sections
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero, .about, .universe');
  
  parallaxElements.forEach((el, index) => {
    const speed = 0.3 + (index * 0.1);
    const yPos = -(scrolled * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
  
  lastScroll = scrolled;
}, { passive: true });

// Add subtle animations on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
  });
}, observerOptions);

document.querySelectorAll('.project-card, .symphony-item, .social-card').forEach(el => {
  animateOnScroll.observe(el);
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
