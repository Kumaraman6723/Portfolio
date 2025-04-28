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
document.addEventListener("DOMContentLoaded", () => {
  type();

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
  if (document.getElementById("particles-js")) {
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

  // LeetCode Stats Toggle with Real Data Fetching

  // Skills Data
  const skills = [
    {
      name: "ReactJS",
      icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
    },
    {
      name: "ExpressJS",
      icon: "https://img.icons8.com/fluency/48/000000/node-js.png",
    },
    {
      name: "NodeJS",
      icon: "https://img.icons8.com/color/48/000000/nodejs.png",
    },
    {
      name: "Redux",
      icon: "https://img.icons8.com/color/48/000000/redux.png",
    },
    {
      name: "Flask",
      icon: "https://img.icons8.com/color/48/000000/flask.png",
    },
    {
      name: "Spring Boot",
      icon: "https://img.icons8.com/color/48/000000/spring-logo.png",
    },
    {
      name: "Tailwind CSS",
      icon: "https://img.icons8.com/color/48/000000/tailwindcss.png",
    },
    {
      name: "Bootstrap",
      icon: "https://img.icons8.com/color/48/000000/bootstrap.png",
    },
    {
      name: "HTML5",
      icon: "https://img.icons8.com/color/48/000000/html-5--v1.png",
    },
    {
      name: "CSS3",
      icon: "https://img.icons8.com/color/48/000000/css3.png",
    },
    {
      name: "JavaScript",
      icon: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    },
    {
      name: "Java",
      icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png",
    },
    {
      name: "Python",
      icon: "https://img.icons8.com/color/48/000000/python--v1.png",
    },
    {
      name: "C",
      icon: "https://img.icons8.com/color/48/000000/c-programming.png",
    },
    {
      name: "Git",
      icon: "https://img.icons8.com/color/48/000000/git.png",
    },
    {
      name: "MongoDB",
      icon: "https://img.icons8.com/color/48/000000/mongodb.png",
    },
    {
      name: "MySQL",
      icon: "https://img.icons8.com/color/48/000000/mysql-logo.png",
    },
    {
      name: "Heroku",
      icon: "https://img.icons8.com/color/48/000000/heroku.png",
    },
    {
      name: "jQuery",
      icon: "https://img.icons8.com/ios-filled/48/1169ae/jquery.png",
    },
    {
      name: "GitHub",
      icon: "https://img.icons8.com/color/48/000000/github--v1.png",
    },
    {
      name: "WordPress",
      icon: "https://img.icons8.com/color/48/000000/wordpress.png",
    },
  ];

  // Function to create skill cards
  function createSkillCards(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = ""; // Clear existing content

    skills.forEach((skill) => {
      const skillCard = document.createElement("div");
      skillCard.className = "skill-card";
      skillCard.innerHTML = `
              <img src="${skill.icon}" alt="${skill.name} icon">
              <div class="info"><span>${skill.name}</span></div>
            `;
      skillsContainer.appendChild(skillCard);
    });
  }

  // Initialize skill cards
  createSkillCards(skills);
});
