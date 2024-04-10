// !scroll to section

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
let currentActiveSection = null;

function setActiveNav() {
  const headerHeight = document.querySelector("header").offsetHeight;
  const scrollPosition = window.scrollY + headerHeight;

  // Find the section that is currently in view
  let activeSection = null;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - headerHeight;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      activeSection = section;
    }
  });

  // Update the active navigation link if the active section has changed
  if (activeSection && activeSection !== currentActiveSection) {
    currentActiveSection = activeSection;
    const currentId = activeSection.getAttribute("id");
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  // Handle scrolling from bottom to top
  if (scrollPosition < headerHeight) {
    let upcomingSection = null;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight;
      const distanceToViewportTop = sectionTop - scrollPosition;

      if (distanceToViewportTop <= 10 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
        upcomingSection = section;
      }
    });

    if (upcomingSection && upcomingSection !== currentActiveSection) {
      currentActiveSection = upcomingSection;
      const currentId = upcomingSection.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  }
}

window.addEventListener("scroll", setActiveNav);

// !sequentially show web ellements
document.addEventListener("DOMContentLoaded", function() {
  // Array of elements in the order you want them to be revealed
  const elements = ["header", "sidebar", "main"];

  // Function to reveal elements sequentially
  function revealElements(index) {
    if (index < elements.length) {
      const element = document.getElementById(elements[index]);
      element.classList.add("visible"); // Add class to make the element visible
      setTimeout(function() {
        revealElements(index + 1);
      }, 500); // Adjust this timeout value to control the delay between element reveals
    }
  }

  // Start revealing elements when the page loads
  revealElements(0);
});

// !scroll to top
document.addEventListener("DOMContentLoaded", function() {
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  scrollToTopBtn.addEventListener("click", function() {
    scrollToTopBtn.classList.add("rotated"); // Apply rotation

    // Function to calculate the rotation angle based on scroll progress
    function calculateRotation(scrollProgress) {
      // 360 degrees per second rotation
      return 360 * scrollProgress;
    }

    // Function to check if page is scrolled to bottom
    function isPageScrolledToBottom() {
      return window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }

    // Function to handle scroll event
    function handleScroll() {
      if (!isPageScrolledToBottom()) {
        const scrollProgress = window.scrollY / (document.body.offsetHeight - window.innerHeight);
        const rotationAngle = calculateRotation(scrollProgress);

        scrollToTopBtn.style.transform = `rotate(${rotationAngle}deg)`;

        requestAnimationFrame(handleScroll); // Continue scrolling animation
      }
    }

    // Start scrolling animation
    requestAnimationFrame(handleScroll);
  });
});