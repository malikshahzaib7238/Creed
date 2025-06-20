// ===================================================================
// == THE CREED - MAIN JAVASCRIPT FILE
// ===================================================================

document.addEventListener("DOMContentLoaded", () => {
  // We will organize our code into functions for clarity.
  setupCustomCursor();
  setupGallerySlider();
  setupMobileNavbar(); // The new, smart navbar logic
});

// -------------------------------------------------------------------
// --- 1. CUSTOM CURSOR LOGIC
// -------------------------------------------------------------------
function setupCustomCursor() {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");

  if (!cursorDot || !cursorOutline) return;

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate(
      { left: `${posX}px`, top: `${posY}px` },
      { duration: 500, fill: "forwards" }
    );
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .nav-button, .main-header nav a, .testimonial, .gallery img"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseover", () => {
      cursorDot.classList.add("active");
      cursorOutline.classList.add("active");
    });
    el.addEventListener("mouseout", () => {
      cursorDot.classList.remove("active");
      cursorOutline.classList.remove("active");
    });
  });
}

// -------------------------------------------------------------------
// --- 2. GALLERY SLIDER LOGIC
// -------------------------------------------------------------------
function setupGallerySlider() {
  const slides = [
    {
      mainImage: "public/midmain.png",
      titleImage: "public/text_center.png",
      subtitleText:
        "We cater to clients of every scale, always upholding a standard of excellence.",
    },
    {
      mainImage: "public/midside.png",
      titleImage: "public/text_center.png",
      subtitleText:
        "Our second sculpture explores the theme of heroic triumph.",
    },
    {
      mainImage: "public/right.png",
      titleImage: "public/text_center.png",
      subtitleText: "This piece captures a moment of quiet contemplation.",
    },
  ];

  const gallery = document.querySelector(".gallery");
  if (!gallery) return; // Exit if the gallery doesn't exist on this page

  const leftArrow = gallery.querySelector(".left");
  const rightArrow = gallery.querySelector(".right");
  const mainImageElement = gallery.querySelector(".main-image");
  const titleImageElement = document.querySelector(".flex-portfolio img");
  const subtitleElement = document.querySelector(".flex-portfolio .subtitle");

  if (
    !leftArrow ||
    !rightArrow ||
    !mainImageElement ||
    !titleImageElement ||
    !subtitleElement
  ) {
    return;
  }

  let currentIndex = 0;

  function showSlide(index) {
    mainImageElement.style.opacity = "0";
    titleImageElement.style.opacity = "0";
    subtitleElement.style.opacity = "0";

    setTimeout(() => {
      const newSlide = slides[index];
      mainImageElement.src = newSlide.mainImage;
      titleImageElement.src = newSlide.titleImage;
      subtitleElement.textContent = newSlide.subtitleText;
      mainImageElement.style.opacity = "1";
      titleImageElement.style.opacity = "1";
      subtitleElement.style.opacity = "1";
    }, 300);
  }

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
}

function setupMobileNavbar() {
  const navBar = document.querySelector(".mobile-nav-bar");
  if (!navBar) return; // Exit if the navbar doesn't exist on this page

  const navButtons = navBar.querySelectorAll(".nav-button");
  const indicator = document.getElementById("nav-indicator");

  if (navButtons.length === 0 || !indicator) return;

  // --- Function to move the light indicator to a button ---
  function moveIndicatorTo(button) {
    if (!button) return;
    setTimeout(() => {
      const buttonRect = button.getBoundingClientRect();
      const navBarRect = navBar.getBoundingClientRect();
      if (navBarRect.width > 0) {
        const offset =
          buttonRect.left -
          navBarRect.left +
          buttonRect.width / 2 -
          indicator.offsetWidth / 2;
        indicator.style.left = `${offset}px`;
      }
    }, 100); // A small delay ensures the browser has rendered everything
  }

  // --- The "Brain": This function now understands URL hashes correctly ---
  function updateActiveState() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash; // Gets the # part, e.g., "#contact"

    let activeButton = null;

    // Remove active class from all buttons to reset
    navButtons.forEach((btn) => btn.classList.remove("active"));

    // --- PRIORITY 1: Check if the URL has a hash (#contact, #portfolio, etc.) ---
    if (currentHash) {
      // Find a button whose href ENDS WITH the current hash.
      // This works for both href="#contact" and href="../index.html#contact"
      activeButton = navBar.querySelector(
        `a.nav-button[href$="${currentHash}"]`
      );
    }

    // --- PRIORITY 2: If no hash, check the page filename (e.g., about.html) ---
    if (!activeButton) {
      const currentFile = currentPath.split("/").pop();
      if (currentFile && currentFile !== "index.html" && currentFile !== "") {
        navButtons.forEach((button) => {
          if (button.getAttribute("href").endsWith(currentFile)) {
            activeButton = button;
          }
        });
      }
    }

    // --- PRIORITY 3: If still no match, it must be the homepage ---
    if (!activeButton) {
      activeButton = navBar.querySelector('a.nav-button[href$="#top"]');
    }

    // If we found a matching button, activate it!
    if (activeButton) {
      activeButton.classList.add("active");
      moveIndicatorTo(activeButton);
    }
  }

  // --- Initialize everything ---
  updateActiveState(); // Run the brain function on page load

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      // Instantly move the indicator on click for better user feedback
      moveIndicatorTo(e.currentTarget);
    });
  });

  // Re-run the brain function when user navigates with back/forward buttons
  window.addEventListener("pageshow", updateActiveState);
  window.addEventListener('hashchange', updateActiveState);

}
