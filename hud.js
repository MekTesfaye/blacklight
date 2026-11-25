/* Blacklight Studios: the HUD. Brackets lock onto each translated line as it comes into view,
   and the contact band shows the time in Brisbane. Without script, the brackets simply sit in place. */
(() => {
  const lines = document.querySelectorAll('.now');
  if ('IntersectionObserver' in window && lines.length) {
    const lockWatch = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-locked');
        lockWatch.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -15% 0px' });
    lines.forEach((el) => { el.classList.add('is-armed'); lockWatch.observe(el); });
  }

  const clock = document.querySelector('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', hour: 'numeric', minute: '2-digit' });
    const tick = () => { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);
  }
})();
