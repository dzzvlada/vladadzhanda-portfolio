(function () {
  if (window.__reveal) return; window.__reveal = true;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var seen = new WeakSet();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target; io.unobserve(el);
      el.style.opacity = '1'; el.style.transform = 'none';
      setTimeout(function () { el.style.transition = el.__rvT || ''; el.style.transform = el.__rvX || ''; el.style.opacity = el.__rvO || ''; }, 950);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  function scan() {
    var secs = document.querySelectorAll('section');
    for (var i = 1; i < secs.length; i++) {
      var kids = secs[i].children;
      for (var j = 0; j < kids.length; j++) {
        var el = kids[j];
        if (seen.has(el)) continue; seen.add(el);
        var cs = getComputedStyle(el);
        if (cs.position === 'fixed' || cs.position === 'sticky' || cs.transform !== 'none' || parseFloat(cs.opacity) < 1) continue;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) continue;
        el.__rvT = el.style.transition; el.__rvX = el.style.transform; el.__rvO = el.style.opacity;
        el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity .9s cubic-bezier(.2,.7,.2,1) ' + (j * 0.08).toFixed(2) + 's, transform .9s cubic-bezier(.2,.7,.2,1) ' + (j * 0.08).toFixed(2) + 's';
        io.observe(el);
      }
    }
  }
  var n = 0, t = setInterval(function () { scan(); if (++n > 12) clearInterval(t); }, 400);
  window.addEventListener('load', scan);
})();
