const START_DATE = new Date(2024, 9, 15, 0, 0, 0); // October 15, 2024, local time

function updateTimer() {
  const now = new Date();
  if (now < START_DATE) return;
  let years = now.getFullYear() - START_DATE.getFullYear();
  const anniversary = new Date(START_DATE);
  anniversary.setFullYear(START_DATE.getFullYear() + years);
  if (now < anniversary) years--;
  const anchor = new Date(START_DATE);
  anchor.setFullYear(START_DATE.getFullYear() + years);
  let remaining = Math.floor((now - anchor) / 1000);
  const days = Math.floor(remaining / 86400); remaining %= 86400;
  const hours = Math.floor(remaining / 3600); remaining %= 3600;
  const minutes = Math.floor(remaining / 60);
  const seconds = Math.floor(remaining % 60);
  document.getElementById('years').textContent = years;
  document.getElementById('days').textContent = String(days).padStart(3, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateTimer();
setInterval(updateTimer, 1000);

const floatingHearts = document.getElementById('floatingHearts');
function makeHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > .45 ? '♡' : '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${12 + Math.random() * 20}px`;
  const duration = 9 + Math.random() * 9;
  heart.style.animationDuration = `${duration}s`;
  floatingHearts.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
for (let i = 0; i < 12; i++) setTimeout(makeHeart, i * 350);
setInterval(makeHeart, 1000);

const toast = document.getElementById('toast');
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.getElementById('openHeartBtn').addEventListener('click', () => {
  document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
  burstHearts();
});
function burstHearts() {
  for (let i = 0; i < 18; i++) {
    const heart = document.createElement('span');
    heart.textContent = i % 3 === 0 ? '♥' : '♡';
    heart.style.cssText = `position:fixed;z-index:20;left:${35 + Math.random()*30}%;top:${38 + Math.random()*20}%;font-size:${14+Math.random()*22}px;color:${['#e56b98','#d88aaa','#c65080'][i%3]};pointer-events:none;transition:transform 1.3s ease,opacity 1.3s ease;`;
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.transform = `translate(${(Math.random()-.5)*260}px,${-80-Math.random()*220}px) rotate(${Math.random()*100-50}deg)`;
      heart.style.opacity = '0';
    });
    setTimeout(() => heart.remove(), 1400);
  }
}

document.getElementById('secretBtn').addEventListener('click', () => {
  const message = document.getElementById('secretMessage');
  const isHidden = message.hidden;
  message.hidden = !isHidden;
  document.getElementById('secretBtn').innerHTML = isHidden ? '<span class="lock">♥</span> Hide the secret' : '<span class="lock">♡</span> Tap for your secret';
  if (isHidden) {
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
    burstHearts();
  }
});

document.querySelectorAll('.memory-card input').forEach(input => {
  input.addEventListener('change', event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please choose an image file.'); return; }
    const card = input.closest('.memory-card');
    const img = card.querySelector('img');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';
    card.querySelector('.memory-placeholder').style.display = 'none';
    showToast('Photo preview added on this device ♡');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(section => revealObserver.observe(section));
