//Trinketsoft js written by Chloe Laws. I fucking hate Javascript. I want the internet to burn and me along with it
const toggleBtn = document.getElementById('toggleTheme');
const body = document.body;
const tiltimg = document.querySelector('.tilt');

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});
//image tilt
document.addEventListener('mousemove', (e) => {
    const {innerWidth:w , innerHeight:h} = window;
    const x = (e.clientX - w / 2)/(w / 2);
    const y = (e.clientY - h / 2)/(h / 2);
    const maxTilt = 15;//degrees
    const rotateX = -y * maxTilt;
    const rotateY = x * maxTilt;
    tiltimg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
document.addEventListener('mouseleave', () => {
    tiltimg.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

// Theme toggle code. light/dark switch
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light');
  toggleBtn.textContent = '☀️';
}

toggleBtn.addEventListener('click', () => {
  const isLight = body.classList.toggle('light');
  toggleBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Contact form logic
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.classList.remove('show');
  status.textContent = 'Sending...';
  status.style.color = 'var(--accent)';
  setTimeout(() => status.classList.add('show'), 10);

  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.textContent = '🎉 Message sent successfully!';
      status.style.color = 'limegreen';
      form.reset();
    } else {
      throw new Error();
    }
  } catch (err) {
    status.textContent = '❌ Oops! Something went wrong.';
    status.style.color = 'tomato';
  }
});
