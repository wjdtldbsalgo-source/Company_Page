document.documentElement.classList.add("js");

const intro = document.querySelector("#intro");
const skipIntro = document.querySelector("#skip-intro");
let introTimer;

function dismissIntro() {
  if (!intro || intro.classList.contains("is-leaving")) return;
  window.clearTimeout(introTimer);
  intro.classList.add("is-leaving");
  window.setTimeout(() => intro.remove(), 600);
}

if (intro && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  introTimer = window.setTimeout(dismissIntro, 3800);
  skipIntro?.addEventListener("click", dismissIntro);
} else {
  intro?.remove();
}

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "메뉴 열기");
  primaryNav?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
  primaryNav?.classList.toggle("is-open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 620) closeMenu();
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const formStatus = document.querySelector("#form-status");
if (formStatus && new URLSearchParams(window.location.search).get("success") === "true") {
  formStatus.hidden = false;
  document.querySelector("#contact")?.scrollIntoView({ block: "start" });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
