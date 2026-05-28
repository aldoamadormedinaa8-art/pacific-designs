/* ── Language Toggle ── */
let currentLang = 'es';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.getElementById('langToggle').textContent = lang === 'es' ? 'EN' : 'ES';

  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
  });

  // Placeholders
  const placeholders = {
    es: { name: 'Tu nombre', company: 'Tu empresa (opcional)', email: 'tu@email.com', phone: '+1 000 000 0000', msg: 'Cuéntanos sobre tu proyecto...', mname: 'Tu nombre', memail: 'tu@email.com', mphone: 'WhatsApp / Teléfono', mmsg: 'Cuéntanos más...' },
    en: { name: 'Your name', company: 'Your company (optional)', email: 'you@email.com', phone: '+1 000 000 0000', msg: 'Tell us about your project...', mname: 'Your name', memail: 'you@email.com', mphone: 'WhatsApp / Phone', mmsg: 'Tell us more...' }
  };
  const p = placeholders[lang];
  const s = id => document.getElementById(id);
  if (s('formName'))    s('formName').placeholder    = p.name;
  if (s('formCompany')) s('formCompany').placeholder = p.company;
  if (s('formEmail'))   s('formEmail').placeholder   = p.email;
  if (s('formPhone'))   s('formPhone').placeholder   = p.phone;
  if (s('formMessage')) s('formMessage').placeholder = p.msg;
  if (s('modalName'))   s('modalName').placeholder   = p.mname;
  if (s('modalEmail'))  s('modalEmail').placeholder  = p.memail;
  if (s('modalPhone'))  s('modalPhone').placeholder  = p.mphone;
  if (s('modalMessage'))s('modalMessage').placeholder= p.mmsg;
}

document.getElementById('langToggle').addEventListener('click', () => {
  setLang(currentLang === 'es' ? 'en' : 'es');
});

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .about-grid, .contact-form, .stat').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

/* ── Modal ── */
const services = {
  web:    { icon: '🌐', es: { title: 'Páginas Web', desc: 'Cuéntanos sobre tu proyecto web y te contactamos en menos de 24 horas.' }, en: { title: 'Websites', desc: 'Tell us about your web project and we\'ll get back to you within 24 hours.' } },
  crm:    { icon: '📊', es: { title: 'CRM', desc: 'Mejora la gestión de tus clientes. Platicamos sobre la solución ideal para tu negocio.' }, en: { title: 'CRM', desc: 'Improve your customer management. Let\'s talk about the ideal solution for your business.' } },
  dms:    { icon: '🗂️', es: { title: 'DMS', desc: 'Gestiona tus documentos de forma inteligente. Cuéntanos qué necesitas.' }, en: { title: 'DMS', desc: 'Manage your documents intelligently. Tell us what you need.' } },
  auto:   { icon: '⚡', es: { title: 'Automatizaciones', desc: 'Automatizamos los procesos de tu negocio para que trabajes de manera más eficiente.' }, en: { title: 'Automations', desc: 'We automate your business processes so you can work more efficiently.' } },
  social: { icon: '📱', es: { title: 'Redes Sociales', desc: 'Creamos y configuramos tu presencia en Facebook, Instagram y TikTok.' }, en: { title: 'Social Media', desc: 'We create and configure your presence on Facebook, Instagram, and TikTok.' } },
  apps:   { icon: '📲', es: { title: 'Aplicaciones Móviles', desc: 'Desarrollamos tu aplicación para iOS y Android. Cuéntanos tu idea.' }, en: { title: 'Mobile Apps', desc: 'We develop your app for iOS and Android. Tell us your idea.' } },
  brand:  { icon: '🎨', es: { title: 'Identidad de Marca', desc: 'Diseñamos la identidad visual de tu marca. Logo, colores, tipografía y más.' }, en: { title: 'Brand Identity', desc: 'We design your brand\'s visual identity. Logo, colors, typography and more.' } },
  ecom:   { icon: '🛒', es: { title: 'Tiendas en Línea', desc: 'Construimos tu tienda online con todo lo necesario para vender en internet.' }, en: { title: 'E-commerce', desc: 'We build your online store with everything needed to sell on the internet.' } },
  custom: { icon: '✨', es: { title: '¿Tienes una idea?', desc: 'Cuéntanos sobre tu proyecto y exploramos juntos la mejor solución digital.' }, en: { title: 'Got an idea?', desc: 'Tell us about your project and we\'ll explore the best digital solution together.' } },
};

let currentService = '';

function openModal(key) {
  currentService = key;
  const s = services[key];
  const l = currentLang;
  document.getElementById('modalIcon').textContent  = s.icon;
  document.getElementById('modalTitle').textContent = s[l].title;
  document.getElementById('modalDesc').textContent  = s[l].desc;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Form submit ── */
function showToast() {
  const toast = document.getElementById('toast');
  toast.querySelector('span').textContent = currentLang === 'es'
    ? '✓ Mensaje enviado. Te contactamos pronto.'
    : '✓ Message sent. We\'ll contact you soon.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function submitForm(e) {
  e.preventDefault();
  showToast();
  e.target.reset();
}

function submitModal(e) {
  e.preventDefault();
  closeModal();
  showToast();
  e.target.reset();
}
