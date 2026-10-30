// Velora Studio - shared interactions (Vanilla JavaScript)
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks?.classList.remove('open')));

// Dark / light mode with saved preference
const themeBtn = document.querySelector('.theme-toggle');
if (localStorage.getItem('velora-theme') === 'light') document.body.classList.add('light');
function updateThemeIcon(){ if(themeBtn) themeBtn.textContent = document.body.classList.contains('light') ? '☾' : '☼'; }
updateThemeIcon();
themeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('velora-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
});

// Scroll-to-top
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop?.classList.toggle('show', window.scrollY > 350));
backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting || entry.target.dataset.done) return;
  const el = entry.target, target = Number(el.dataset.count), duration = 1300, start = performance.now();
  el.dataset.done = 'true';
  function tick(now){ const progress = Math.min((now-start)/duration,1); el.textContent = Math.floor(target * progress) + (el.dataset.suffix || '+'); if(progress < 1) requestAnimationFrame(tick); }
  requestAnimationFrame(tick);
}), {threshold:.5});
counters.forEach(counter => counterObserver.observe(counter));

// Typing animation
const typing = document.querySelector('[data-typing]');
if (typing) {
  const words = ['Digital Experiences', 'Beautiful Websites', 'Stronger Brands'];
  let word = 0, char = 0, deleting = false;
  function type(){ const current = words[word]; typing.textContent = current.substring(0,char);
    if(!deleting && char < current.length){char++;setTimeout(type,85);}
    else if(deleting && char > 0){char--;setTimeout(type,42);}
    else {deleting = !deleting;if(!deleting) word=(word+1)%words.length;setTimeout(type,700);}
  } type();
}

// Image slider
const slides = [...document.querySelectorAll('.slide')];
let slideIndex = 0;
function showSlide(index){ if(!slides.length)return; slides.forEach((s,i)=>s.classList.toggle('active',i===index)); slideIndex=index; }
document.querySelector('.slide-next')?.addEventListener('click',()=>showSlide((slideIndex+1)%slides.length));
document.querySelector('.slide-prev')?.addEventListener('click',()=>showSlide((slideIndex-1+slides.length)%slides.length));
if(slides.length) setInterval(()=>showSlide((slideIndex+1)%slides.length),5500);

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => btn.addEventListener('click',()=>{
  const item=btn.closest('.faq-item');
  document.querySelectorAll('.faq-item').forEach(other=>{if(other!==item)other.classList.remove('open');});
  item.classList.toggle('open');
}));

// Portfolio filters
document.querySelectorAll('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter=btn.dataset.filter;
  document.querySelectorAll('.portfolio-item').forEach(item=>{
    item.style.display=(filter==='all'||item.dataset.category===filter)?'':'none';
  });
}));

// Contact form validation (front-end demo)
const contactForm=document.querySelector('#contactForm');
contactForm?.addEventListener('submit',e=>{
  e.preventDefault();
  let valid=true;
  const name=contactForm.querySelector('#name'),email=contactForm.querySelector('#email'),message=contactForm.querySelector('#message');
  contactForm.querySelectorAll('.error').forEach(el=>el.textContent='');
  if(name.value.trim().length<2){contactForm.querySelector('#nameError').textContent='Please enter your name.';valid=false;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){contactForm.querySelector('#emailError').textContent='Enter a valid email address.';valid=false;}
  if(message.value.trim().length<10){contactForm.querySelector('#messageError').textContent='Message must be at least 10 characters.';valid=false;}
  const status=contactForm.querySelector('#formStatus');
  if(valid){status.textContent='Thanks! Your message passed validation. Connect a backend to receive messages.';contactForm.reset();}
  else status.textContent='';
});

// Scroll reveal
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
