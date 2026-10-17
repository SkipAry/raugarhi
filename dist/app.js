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

// Escape closes the mobile navigation and restores its trigger focus.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
  }
});
// Keep the hero uncluttered; show the fixed enquiry link below it.
const floatingContact = document.querySelector('.floating-contact');
if ('IntersectionObserver' in window) {
  floatingContact.hidden = true;
  new IntersectionObserver(([entry]) => { floatingContact.hidden = entry.isIntersecting; }, {threshold:0})
    .observe(document.querySelector('.hero'));
}

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
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
async function startFilm() {
  try { await video.play(); } catch { /* Keep the poster visible when autoplay is unavailable. */ }
}
reducedMotion.addEventListener('change', event => {
  if (event.matches) video.pause(); else if (!document.hidden) startFilm();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) video.pause(); else if (!reducedMotion.matches) startFilm();
});
if (!reducedMotion.matches) { video.muted = true; startFilm(); }

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
// Search the complete bilingual menu, retaining category navigation when cleared.
const menuSearch = document.querySelector('#menu-search');
const menuPanels = [...document.querySelectorAll('.menu-panel')];
const menuTabList = document.querySelector('.menu-tabs');
const menuResults = document.querySelector('#menu-results');
const menuEmpty = document.querySelector('#menu-empty');
menuSearch.addEventListener('input', () => {
  const query = menuSearch.value.trim().normalize('NFC').toLocaleLowerCase('en-IN');
  menuTabList.hidden = Boolean(query);
  let matches = 0;
  menuPanels.forEach(panel => {
    let panelMatches = 0;
    panel.querySelectorAll('.menu-subcategory').forEach(group => {
      let groupMatches = 0;
      group.querySelectorAll('.menu-dish').forEach(dish => {
        const found = !query || dish.textContent.normalize('NFC').toLocaleLowerCase('en-IN').includes(query);
        dish.hidden = !found;
        if (found) groupMatches++;
      });
      group.hidden = !groupMatches;
      panelMatches += groupMatches;
    });
    panel.hidden = !panelMatches;
    matches += panelMatches;
  });
  menuEmpty.hidden = matches > 0;
  menuResults.textContent = query ? `${matches} matching selections` : `${matches} menu selections`;
  if (!query) selectMenuTab(menuTabs.find(tab => tab.getAttribute('aria-selected') === 'true') || menuTabs[0]);
});
// Photo album: every supplied image can be inspected at full size.
const photoCards = [...document.querySelectorAll('[data-gallery-index]')];
const photoDialog = document.querySelector('#photo-lightbox');
let currentPhoto = 0;
function showPhoto(index) {
  currentPhoto = (index + photoCards.length) % photoCards.length;
  const card = photoCards[currentPhoto];
  const image = photoDialog.querySelector('img');
  image.src = card.dataset.full;
  image.alt = card.querySelector('img').alt;
  photoDialog.querySelector('figcaption').textContent = card.dataset.caption;
  photoDialog.querySelector('.lightbox-count').textContent = `${currentPhoto + 1} / ${photoCards.length}`;
}
photoCards.forEach((card,index) => card.addEventListener('click', () => {showPhoto(index);photoDialog.showModal();}));
photoDialog.querySelector('.lightbox-close').addEventListener('click', () => photoDialog.close());
photoDialog.querySelector('.lightbox-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
photoDialog.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
photoDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
photoDialog.addEventListener('click', event => {if(event.target === photoDialog) {const rect=photoDialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)photoDialog.close();}});
// Progressive motion: content stays visible when observers are unavailable.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealTargets = document.querySelectorAll('.photo-card,.welcome-copy,.section-intro,.history-heading,.history-image,.history-chapter,.wada-copy,.album-heading,.reservation-copy,#reservation-form,.visit-heading,.visit-links');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }), {threshold:0.08,rootMargin:'0px 0px -30px 0px'});
  revealTargets.forEach(target => {target.classList.add('reveal');observer.observe(target);});
  document.documentElement.classList.add('js-motion');
}
const progress = document.createElement('div');
progress.className = 'scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let progressQueued = false;
function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1,window.scrollY / range) : 0})`;
  progressQueued = false;
}
window.addEventListener('scroll', () => {if(!progressQueued){progressQueued=true;window.requestAnimationFrame(updateProgress);}}, {passive:true});
window.addEventListener('resize', updateProgress);
updateProgress();
