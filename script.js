function toggleMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.classList.toggle("open");
}

function closeMenu() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;
  nav.classList.remove("open");
}

document.addEventListener("click", function (e) {
  const nav = document.getElementById("navLinks");
  const toggle = document.querySelector(".nav-toggle");
  if (!nav || !toggle) return;

  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove("open");
  }
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 760) closeMenu();
});

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item) => observer.observe(item));
}

function initSliders() {
  const sliders = document.querySelectorAll("[data-slider]");
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".hero-slide");
    const dotsWrap = slider.querySelector(".hero-dots");
    if (!slides.length || !dotsWrap) return;

    let index = 0;
    let timer = null;

    function renderDots() {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot" + (i === index ? " active" : "");
        dot.addEventListener("click", () => {
          index = i;
          update();
          restart();
        });
        dotsWrap.appendChild(dot);
      });
    }

    function update() {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      renderDots();
    }

    function start() {
      timer = setInterval(() => {
        index = (index + 1) % slides.length;
        update();
      }, 4300);
    }

    function restart() {
      clearInterval(timer);
      start();
    }

    update();
    start();

    slider.addEventListener("mouseenter", () => clearInterval(timer));
    slider.addEventListener("mouseleave", () => restart());
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initReveal();
  initSliders();
});