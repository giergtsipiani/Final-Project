// !warning
function quitButton() {
  // Redirect the user to another page or perform any other action you desire
  window.location.href = "https://naruto-official.com/en";
}
function continueButton() {
  // Hide the warning message
  document.getElementById("warning").style.display = "none";
}

// !scroll to section

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
let currentActiveSection = null;

function setActiveNav() {
  const headerHeight = document.querySelector("header").offsetHeight;
  const scrollPosition = window.scrollY + headerHeight;

  // Find the section that is currently in view
  let activeSection = null;
  sections.forEach((section) => {
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
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }
}

window.addEventListener("scroll", setActiveNav);

// !sequentially show web ellements
document.addEventListener("DOMContentLoaded", function () {
  // Array of elements in the order you want them to be revealed
  const elements = ["header", "sidebar", "main"];

  // Function to reveal elements sequentially
  function revealElements(index) {
    if (index < elements.length) {
      const element = document.getElementById(elements[index]);
      element.classList.add("visible"); // Add class to make the element visible
      setTimeout(function () {
        revealElements(index + 1);
      }, 500); // Adjust this timeout value to control the delay between element reveals
    }
  }

  // Start revealing elements when the page loads
  revealElements(0);
});
