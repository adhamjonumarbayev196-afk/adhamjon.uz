// Navbar active link + scroll spy
const navLinks = document.querySelectorAll(".links a");
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 130;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) current = id;
  });

  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("show");
});

// Close menu on click
navLinks.forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("show"));
});

// Skills animation when in view
const bars = document.querySelectorAll(".bar span");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      bars.forEach(b => {
        b.style.width = b.dataset.width + "%";
      });
    }
  });
}, {threshold: 0.4});

const skillsSection = document.getElementById("skills");
observer.observe(skillsSection);

// Project filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const type = btn.dataset.filter;

    projects.forEach(card => {
      const cardType = card.dataset.type;
      if(type === "all" || cardType === type){
        card.style.display = "block";
        card.animate([{opacity:0, transform:"translateY(10px)"},{opacity:1, transform:"translateY(0px)"}],
          {duration:260, fill:"forwards"});
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Contact form demo
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if(!name || !email || !message){
    formMsg.textContent = "❌ Iltimos hammasini to‘ldiring!";
    return;
  }

  formMsg.textContent = "✅ Xabar yuborildi! (demo)";
  form.reset();
});

// Theme toggle
const themeBtn = document.getElementById("themeBtn");

function setTheme(mode){
  document.body.classList.toggle("light", mode === "light");
  themeBtn.textContent = mode === "light" ? "☀️" : "🌙";
  localStorage.setItem("theme", mode);
}

const savedTheme = localStorage.getItem("theme") || "dark";
setTheme(savedTheme);

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// year
document.getElementById("year").textContent = new Date().getFullYear();
