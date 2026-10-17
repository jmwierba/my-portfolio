// Smooth scroll for nav links and table of contents links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active nav item + add shadow to navbar on scroll
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-menu a');

function onScroll() {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  navbar.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Gentle fade-in for content boxes as they scroll into view
const revealTargets = document.querySelectorAll(
  '.contact-card, .about-portfolio, .toc-box, .project-overview, ' +
  '.project-details, .decision-process, .contributions, .image-item'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
