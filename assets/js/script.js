// Navbar menu toggle
let menu = document.querySelector("#menu");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

// Active link based on scroll position
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header .navbar ul li a");

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  // Highlight active navbar item
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // Scroll top button visibility
  let scrollTop = document.querySelector("#scroll-top");
  if (window.scrollY > 500) {
    scrollTop.classList.add("active");
  } else {
    scrollTop.classList.remove("active");
  }
};

// Typing effect for home section
const typingText = document.querySelector(".typing-text");
const careers = [
  "Full Stack Development",
  "Web Design",
  "Backend Development",
  "MERN Stack",
  "Spring Boot",
  "Flask",
];
let careerIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typingDelay = 200;

function type() {
  const currentCareer = careers[careerIndex];

  if (isDeleting) {
    typingText.textContent = currentCareer.substring(0, characterIndex - 1);
    characterIndex--;
    typingDelay = 100;
  } else {
    typingText.textContent = currentCareer.substring(0, characterIndex + 1);
    characterIndex++;
    typingDelay = 200;
  }

  if (!isDeleting && characterIndex === currentCareer.length) {
    isDeleting = true;
    typingDelay = 1000; // Pause at end
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
    typingDelay = 500; // Pause before next word
  }

  setTimeout(type, typingDelay);
}

// Start typing effect when page loads

// Tilt effect for project cards
document.querySelectorAll(".tilt").forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const tiltX = (y - 0.5) * 20;
    const tiltY = (x - 0.5) * -20;

    element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
});

// Particles.js implementation for background effect
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("particles-js")) {
    // Simple particle system implementation
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const particlesContainer = document.getElementById("particles-js");

    particlesContainer.appendChild(canvas);
    canvas.width = particlesContainer.offsetWidth;
    canvas.height = particlesContainer.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        color: `rgba(74, 99, 231, ${Math.random() * 0.5 + 0.1})`,
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap particles around edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      // Draw connections between particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(74, 99, 231, ${
              0.2 * (1 - distance / 150)
            })`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();

    // Resize canvas when window is resized
    window.addEventListener("resize", () => {
      canvas.width = particlesContainer.offsetWidth;
      canvas.height = particlesContainer.offsetHeight;
    });
  }
});
