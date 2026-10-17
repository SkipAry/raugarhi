const WHATSAPP = '919272303682';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(link.dataset.whatsapp)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
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
  event.preventDefault();
  dateField.min = localDate();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  if (!name) { form.elements.name.setCustomValidity('Please enter your name.'); form.elements.name.reportValidity(); return; }
  const formattedDate = new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-IN', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  const message = [`Namaskar! I’d like to request a table at Rau Garhi.`, ``, `Name: ${name}`, `Date: ${formattedDate}`, `Preferred time: ${data.get('time')}`, `Guests: ${data.get('guests')}`, `Occasion: ${data.get('occasion') || 'A lovely meal'}`, ...(String(data.get('note')).trim() ? [`Note: ${String(data.get('note')).trim()}`] : []), ``, `Please let me know availability and confirm my reservation. Thank you!`].join('\n');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  document.querySelector('#form-status').textContent = 'Your WhatsApp message is ready. Please send it to request your table. Our team will confirm availability.';
});
form.elements.name.addEventListener('input', () => form.elements.name.setCustomValidity(''));
const dialog = document.querySelector('#lightbox');
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  dialog.querySelector('img').src = button.dataset.image;
  dialog.querySelector('img').alt = button.querySelector('img').alt;
  dialog.querySelector('p').textContent = button.dataset.caption;
  dialog.showModal();
}));
dialog.querySelector('button').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) dialog.close(); } });
const video = document.querySelector('video');
const filmControl = document.querySelector('.film-control');
filmControl.addEventListener('click', async () => {
  if (video.paused) {
    try { await video.play(); filmControl.innerHTML = 'Ⅱ <span>Pause the film</span>'; filmControl.setAttribute('aria-label','Pause the Rau Garhi film'); }
    catch { filmControl.innerHTML = '▶ <span>Try playing the film again</span>'; }
  } else { video.pause(); filmControl.innerHTML = '▶ <span>Play a little of Rau Garhi</span>'; filmControl.setAttribute('aria-label','Play the Rau Garhi film'); }
});
document.querySelector('#year').textContent = new Date().getFullYear();
