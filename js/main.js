// Wait for the entire page's HTML to be loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DEFINE YOUR SLIDES ---
  // This is the most important part to customize.
  // The first item should match what's already in your HTML.
  // Add a new {} object for each slide you want to have.
  const slides = [
    {
      mainImage: "public/midmain.png",
      titleImage: "public/text_center.png",
      subtitleText:
        "We cater to clients of every scale, always upholding a standard of excellence.",
    },
    {
      mainImage: "public/midside.png", // <-- CHANGE to your second image
      titleImage: "public/text_center.png",
      subtitleText:
        "Our second sculpture explores the theme of heroic triumph.",
    },
    {
      mainImage: "public/midside.png", // <-- CHANGE to your third image
      titleImage: "public/text_center.png", // You can re-use titles if you want
      subtitleText: "This piece captures a moment of quiet contemplation.",
    },
    // Add more slide objects here if you have more images
  ];

  // --- 2. SELECT THE HTML ELEMENTS ---
  // We select the elements by their class names from your HTML.
  const leftArrow = document.querySelector(".gallery .left");
  const rightArrow = document.querySelector(".gallery .right");
  const mainImageElement = document.querySelector(".gallery .main-image");
  const titleImageElement = document.querySelector(".flex-portfolio img");
  const subtitleElement = document.querySelector(".flex-portfolio .subtitle");

  // Safety check: if any element isn't found, stop the script.
  if (
    !leftArrow ||
    !rightArrow ||
    !mainImageElement ||
    !titleImageElement ||
    !subtitleElement
  ) {
    console.error(
      "A slider element could not be found. Please check your HTML class names."
    );
    return;
  }

  // --- 3. SLIDER LOGIC ---
  let currentIndex = 0; // This variable tracks which slide is currently shown.

  // This function updates the page with the content of a specific slide
  function showSlide(index) {
    // Fade out the current content
    mainImageElement.style.opacity = "0";
    titleImageElement.style.opacity = "0";
    subtitleElement.style.opacity = "0";

    // Wait for the fade-out animation to finish before changing the content
    setTimeout(() => {
      const newSlide = slides[index];

      // Update the sources and text
      mainImageElement.src = newSlide.mainImage;
      titleImageElement.src = newSlide.titleImage;
      subtitleElement.textContent = newSlide.subtitleText;

      // Fade the new content back in
      mainImageElement.style.opacity = "1";
      titleImageElement.style.opacity = "1";
      subtitleElement.style.opacity = "1";
    }, 300); // This delay (in ms) should match the CSS transition time
  }

  // --- 4. ADD CLICK EVENTS TO THE ARROWS ---

  // When the right arrow is clicked...
  rightArrow.addEventListener("click", () => {
    // Move to the next index, or loop back to the start if at the end
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // When the left arrow is clicked...
  leftArrow.addEventListener("click", () => {
    // Move to the previous index, or loop to the end if at the start
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
  const navButtons = document.querySelectorAll(".mobile-nav-bar .nav-button");
  const indicator = document.getElementById("nav-indicator");

  // Make sure the elements exist before adding listeners
  if (navButtons.length > 0 && indicator) {
    function handleNavClick(e) {
      // NOTE: We don't prevent default, so the links still work!
      const button = e.currentTarget;

      // Remove 'active' class from all buttons
      navButtons.forEach((btn) => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      button.classList.add("active");

      // --- Move the Indicator ---
      const buttonRect = button.getBoundingClientRect();
      // The parentElement is the nav-bar itself
      const navBarRect = button.parentElement.getBoundingClientRect();

      // Calculate offset to center the indicator under the button
      const indicatorOffset =
        buttonRect.left -
        navBarRect.left +
        buttonRect.width / 2 -
        indicator.offsetWidth / 2;
      indicator.style.left = `${indicatorOffset}px`;
    }

    // Attach event listeners to all buttons
    navButtons.forEach((button) => {
      button.addEventListener("click", handleNavClick);
    });

    // --- Set the initial state on page load ---
    // Find the initially active button and move the indicator to it
    const activeButton = document.querySelector(
      ".mobile-nav-bar .nav-button.active"
    );
    if (activeButton) {
      // Use a small timeout to ensure all elements are rendered and have a size
      setTimeout(() => {
        const buttonRect = activeButton.getBoundingClientRect();
        const navBarRect = activeButton.parentElement.getBoundingClientRect();
        const initialOffset =
          buttonRect.left -
          navBarRect.left +
          buttonRect.width / 2 -
          indicator.offsetWidth / 2;
        indicator.style.left = `${initialOffset}px`;
      }, 100);
    }
  }
});
