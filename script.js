const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");

// Theme
const savedTheme = localStorage.getItem("jade-theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeToggle.textContent = isLight ? "☀" : "☾";
  localStorage.setItem("jade-theme", isLight ? "light" : "dark");
});

// Mobile menu
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

// Scroll progress
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(index * 40, 180)}ms`;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Animated statistics
const statObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const number = entry.target;
    const target = Number(number.dataset.count);
    let current = 0;
    const duration = 900;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      current = Math.floor(progress * target);
      number.textContent = current;

      if (progress < 1) requestAnimationFrame(animate);
      else number.textContent = target;
    }

    requestAnimationFrame(animate);
    observer.unobserve(number);
  });
}, { threshold: 0.7 });

document.querySelectorAll("[data-count]").forEach(el => statObserver.observe(el));

// Student search
const searchInput = document.getElementById("studentSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const studentCards = document.querySelectorAll(".student-card");

let activeFilter = "all";

function updateStudents() {
  const query = searchInput.value.toLowerCase().trim();

  studentCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const role = card.dataset.role;

    const matchesSearch = name.includes(query);
    const matchesFilter = activeFilter === "all" || role === "officer";

    card.style.display = matchesSearch && matchesFilter ? "" : "none";
  });
}

searchInput.addEventListener("input", updateStudents);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateStudents();
  });
});

// Random student
const students = [
  "Student One",
  "Student Two",
  "Student Three",
  "Student Four",
  "Student Five",
  "Student Six"
];

const randomBtn = document.getElementById("randomStudentBtn");
const randomResult = document.getElementById("randomResult");

randomBtn.addEventListener("click", () => {
  randomResult.animate(
    [
      { transform: "scale(.7) rotate(-8deg)", opacity: .2 },
      { transform: "scale(1.12) rotate(5deg)", opacity: 1 },
      { transform: "scale(1) rotate(0)", opacity: 1 }
    ],
    { duration: 450, easing: "cubic-bezier(.2,.8,.2,1)" }
  );

  const selected = students[Math.floor(Math.random() * students.length)];
  randomResult.textContent = selected.split(" ").pop();
});

// Random memory
const memories = [
  "The first day we became 11-JADE.",
  "That one class activity nobody will forget.",
  "The moment everyone started cheering.",
  "A random laugh that turned into a whole-class joke.",
  "One of those ordinary days that became a memory."
];

const memoryBtn = document.getElementById("memoryBtn");

memoryBtn.addEventListener("click", () => {
  const selected = memories[Math.floor(Math.random() * memories.length)];
  const original = memoryBtn.innerHTML;

  memoryBtn.innerHTML = `"${selected}"`;

  setTimeout(() => {
    memoryBtn.innerHTML = original;
  }, 3000);
});
