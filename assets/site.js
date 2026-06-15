/* ============================================================
   Loren Vize Deneyimler — ortak script
   Header/footer enjeksiyonu, scroll-reveal, sayaç, mobil menü
   ============================================================ */
(function () {
  "use strict";

  var PHONE = "+90 541 570 07 82";
  var PHONE_HREF = "tel:+905415700782";
  var WHATSAPP =
    "https://wa.me/905415700782?text=Merhaba%2C%20vize%20dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

  var NAV = [
    { href: "deneyimler.html", label: "Ana Sayfa" },
    { href: "yorumlar.html", label: "Yorumlar" },
    { href: "google-yorumlari.html", label: "Google Yorumları" },
    { href: "pasaportlar.html", label: "Pasaportlar" },
    { href: "videolar.html", label: "Videolar" },
    { href: "randevular.html", label: "Randevular" },
  ];

  function currentPage() {
    var path = location.pathname.split("/").pop();
    return path && path.length ? path : "deneyimler.html";
  }

  function buildHeader() {
    var here = currentPage();
    var links = NAV.map(function (item) {
      var active = item.href === here ? " active" : "";
      return (
        '<li><a class="' +
        active.trim() +
        '" href="' +
        item.href +
        '">' +
        item.label +
        "</a></li>"
      );
    }).join("");

    return (
      '<header class="site-header" id="siteHeader">' +
      '<div class="container">' +
      '<nav class="nav" id="siteNav">' +
      '<a class="nav-brand" href="deneyimler.html">' +
      '<img src="logo.png" alt="Loren Vize" />' +
      "<span>Loren Vize<small>DENEYİMLER</small></span>" +
      "</a>" +
      '<ul class="nav-links">' +
      links +
      "</ul>" +
      '<a class="nav-cta" href="' +
      WHATSAPP +
      '" target="_blank" rel="noreferrer">WhatsApp</a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menü">' +
      "<span></span><span></span><span></span>" +
      "</button>" +
      "</nav>" +
      "</div>" +
      "</header>"
    );
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer">' +
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-brand">' +
      '<img src="logo.png" alt="Loren Vize Danışmanlık" />' +
      "<p>Loren Vize Danışmanlık; turistik, ticari, eğitim ve çalışma vizesi başvurularında profil bazlı dosya kurgusu ve süreç takibi sunar. Bu sayfa, tamamlanan başvurulardan oluşan deneyim arşividir.</p>" +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>Sayfalar</h4>" +
      NAV.map(function (i) {
        return '<a href="' + i.href + '">' + i.label + "</a>";
      }).join("") +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>İletişim</h4>" +
      '<a href="' +
      PHONE_HREF +
      '">' +
      PHONE +
      "</a>" +
      '<a href="' +
      WHATSAPP +
      '" target="_blank" rel="noreferrer">WhatsApp ile yazın</a>' +
      '<a href="index.html">Ana siteye dön</a>' +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">© ' +
      year +
      " Loren Vize Danışmanlık. Tüm hakları saklıdır.</div>" +
      "</div>" +
      "</footer>"
    );
  }

  function injectChrome() {
    var headerMount = document.getElementById("header-mount");
    var footerMount = document.getElementById("footer-mount");
    if (headerMount) headerMount.outerHTML = buildHeader();
    if (footerMount) footerMount.outerHTML = buildFooter();
  }

  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var onScroll = function () {
      if (window.scrollY > 12) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileMenu() {
    var nav = document.getElementById("siteNav");
    var toggle = document.getElementById("navToggle");
    if (!nav || !toggle) return;
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("in");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var dur = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + Number(val).toLocaleString("tr-TR") + suffix;
      if (p < 1) requestAnimationFrame(step);
      else
        el.textContent =
          prefix + Number(target.toFixed(decimals)).toLocaleString("tr-TR") + suffix;
    }
    requestAnimationFrame(step);
  }

  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(animateCounter);
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  // expose helper for star markup
  window.LorenUtil = {
    stars: function (rating) {
      var full = Math.round(rating);
      var out = "";
      for (var i = 1; i <= 5; i++) {
        out += i <= full ? "★" : '<span class="empty">★</span>';
      }
      return '<span class="stars" aria-label="' + rating + ' / 5">' + out + "</span>";
    },
    phone: PHONE,
    phoneHref: PHONE_HREF,
    whatsapp: WHATSAPP,
  };

  document.addEventListener("DOMContentLoaded", function () {
    injectChrome();
    initHeaderScroll();
    initMobileMenu();
    initReveal();
    initCounters();
    document.dispatchEvent(new Event("loren:ready"));
  });
})();

// 3D Mouse Parallax, Yazı ve Görsel Geçiş Efektleri
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('hero-container');
  if (!container) return;

  const bgLayer = document.getElementById('bg-layer');
  const textLayer = document.getElementById('text-layer');
  const fgLayer = document.getElementById('fg-layer');
  const rotatingText = document.getElementById('rotating-text');
  const bgSlides = document.querySelectorAll('.bg-slide');

  // --- 1. Parallax Fare Efekti ---
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const ease = 0.08; 

  if(window.matchMedia("(pointer: fine)").matches) {
    container.addEventListener('mousemove', function(e) {
      const rect = container.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    });

    container.addEventListener('mouseleave', function() {
      targetX = 0;
      targetY = 0;
    });

    function animateParallax() {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if(bgLayer) bgLayer.style.transform = `scale(1.1) translate(${currentX * -20}px, ${currentY * -20}px)`;
      if(textLayer) textLayer.style.transform = `translate(${currentX * 40}px, ${currentY * 40}px)`;
      if(fgLayer) fgLayer.style.transform = `translate(${currentX * 90}px, ${currentY * 60}px)`;

      requestAnimationFrame(animateParallax);
    }
    animateParallax();
  }

  // --- 2. Dinamik Yazı Değişimi ---
  const words = ["DOĞRU STRATEJİ", "DOĞRU ZAMAN", "DOĞRU DOSYA", "DOĞRU SONUÇ"];
  let wordIndex = 0;

  setInterval(function() {
    rotatingText.style.opacity = 0;
    rotatingText.style.transform = 'translateY(-20px)';

    setTimeout(function() {
      wordIndex = (wordIndex + 1) % words.length;
      rotatingText.textContent = words[wordIndex];
      rotatingText.style.transform = 'translateY(20px)';

      setTimeout(function() {
        rotatingText.style.opacity = 1;
        rotatingText.style.transform = 'translateY(0)';
      }, 50);
    }, 500); 
  }, 3000); // Her 3 saniyede bir yazı değişir

  // --- 3. Arka Plan Görseli Geçişi (Slayt Efekti) ---
  if (bgSlides.length > 1) {
    let slideIndex = 0;
    setInterval(function() {
      bgSlides[slideIndex].classList.remove('active');
      slideIndex = (slideIndex + 1) % bgSlides.length;
      bgSlides[slideIndex].classList.add('active');
    }, 4500); // Her 4.5 saniyede bir arka plan görseli değişir
  }
});