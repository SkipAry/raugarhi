const WHATSAPP = '919272303682';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(link.dataset.whatsapp)}`;
  link.target = '_blank'; link.rel = 'noopener';
});
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));
const form = document.querySelector('#reservation-form');
const dateField = form.elements.date;
const localDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};
dateField.min = localDate();
form.addEventListener('submit', event => {
  event.preventDefault(); dateField.min = localDate();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  if (!name) { form.elements.name.setCustomValidity('Please enter your name.'); form.elements.name.reportValidity(); return; }
  const formattedDate = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  const message = ['Namaskar! I’d like to request a table at Rau Garhi.', '', `Name: ${name}`, `Date: ${formattedDate}`, `Preferred time: ${data.get('time')}`, `Guests: ${data.get('guests')}`, `Occasion: ${data.get('occasion') || 'A meal together'}`, ...(String(data.get('note')).trim() ? [`Note: ${String(data.get('note')).trim()}`] : []), '', 'Please let me know availability and confirm my reservation. Thank you!'].join('\n');
  const link = document.createElement('a');
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  link.target = '_blank'; link.rel = 'noopener'; link.click();
  document.querySelector('#form-status').textContent = 'Your WhatsApp request is ready. Tap send in WhatsApp; our team will reply to confirm availability.';
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
const video = document.querySelector('#hero-video');
const filmControl = document.querySelector('.film-control');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let playbackWanted = !reducedMotion.matches;
function updateFilmControl() {
  const paused = video.paused;
  filmControl.querySelector('.play-icon').textContent = paused ? '▶' : 'Ⅱ';
  filmControl.querySelector('.film-label').textContent = paused ? 'Play film' : 'Pause film';
  filmControl.setAttribute('aria-label', paused ? 'Play the hero video' : 'Pause the hero video');
}
async function startFilm() { try { await video.play(); } catch { /* Poster and play control remain available when autoplay is blocked. */ } updateFilmControl(); }
video.addEventListener('play', updateFilmControl);
video.addEventListener('pause', updateFilmControl);
filmControl.addEventListener('click', () => {
  if (video.paused) { playbackWanted = true; startFilm(); }
  else { playbackWanted = false; video.pause(); }
});
reducedMotion.addEventListener('change', event => { playbackWanted = !event.matches; if (event.matches) video.pause(); else startFilm(); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause(); else if (playbackWanted) startFilm();
});
if (playbackWanted) { video.muted = true; startFilm(); } else updateFilmControl();
document.querySelector('#year').textContent = new Date().getFullYear();
const menuTabs = [...document.querySelectorAll('[role="tab"]')];
function selectMenuTab(tab, moveFocus = false) {
  menuTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (moveFocus) tab.focus();
}
menuTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMenuTab(tab));
  tab.addEventListener('keydown', event => {
    const keys = { ArrowRight: (index + 1) % menuTabs.length, ArrowLeft: (index - 1 + menuTabs.length) % menuTabs.length, Home: 0, End: menuTabs.length - 1 };
    if (event.key in keys) { event.preventDefault(); selectMenuTab(menuTabs[keys[event.key]], true); }
  });
});
document.querySelector('.print-menu').addEventListener('click', () => window.print());
