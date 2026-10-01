/* Progressive enhancement: the page and links work without JavaScript. */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); }
});
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('js-motion');
  reducedMotion.addEventListener('change', e => {
    if (e.matches) { observer.disconnect(); document.documentElement.classList.remove('js-motion'); }
  });
}
