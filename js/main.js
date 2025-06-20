document.addEventListener("DOMContentLoaded", () => {
  setupCustomCursor();
  setupGallerySlider();
  setupMobileNavbar();
});

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
    }
  ];

  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

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
  if (!navBar) return;

  const navButtons = navBar.querySelectorAll(".nav-button");
  const indicator = document.getElementById("nav-indicator");

  if (navButtons.length === 0 || !indicator) return;

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
    }, 100);
  }

  function updateActiveState() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    let activeButton = null;

    navButtons.forEach((btn) => btn.classList.remove("active"));

    if (currentHash) {
      activeButton = navBar.querySelector(
        `a.nav-button[href$="${currentHash}"]`
      );
    }

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

    if (!activeButton) {
      activeButton = navBar.querySelector('a.nav-button[href$="#top"]');
    }

    if (activeButton) {
      activeButton.classList.add("active");
      moveIndicatorTo(activeButton);
    }
  }

  updateActiveState();

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      moveIndicatorTo(e.currentTarget);
    });
  });

  window.addEventListener("pageshow", updateActiveState);
  window.addEventListener("hashchange", updateActiveState);
}
