import React, { useState, useEffect } from "react";
import Reveal from "../hooks/Reveal";
// import "../styles/index.css";
import "../styles/PortfolioDesktop.css";

const slides = [
    { mainVideo: "vid2.mp4", thumbnail: "./thumbnail2.jpg" },
    { mainVideo: "vid6.mp4", thumbnail: "./thumbnail6.jpg" },
    { mainVideo: "vid5.mp4", thumbnail: "./thumbnail5.jpg" },
    { mainVideo: "vid4.mp4", thumbnail: "./thumbnail4.jpg" },
  { mainVideo: "vid1.mp4", thumbnail: "./thumbnail1.jpg" },
  { mainVideo: "vid3.mp4", thumbnail: "./thumbnail3.jpg" },
];

const PortfolioDesktop = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [modalVideoSrc, setModalVideoSrc] = useState(null);

  // This hook now handles the state update AFTER the animation is complete.
  useEffect(() => {
    // Only run this logic if an animation has been triggered.
    if (animationDirection) {
      const timer = setTimeout(() => {
        // 1. Update the index to match the new visual state.
        if (animationDirection === 'next') {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        } else if (animationDirection === 'prev') {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
        }

        // 2. Reset the animation state so it can be triggered again.
        setAnimationDirection(null);
      }, 600); // This MUST match the CSS animation duration.

      return () => clearTimeout(timer);
    }
  }, [animationDirection]); // This effect depends only on the animation direction.

  // Starts the "next" animation. Does NOT update the index here anymore.
  const handleNext = () => {
    if (!animationDirection) {
      setAnimationDirection("next");
    }
  };

  // Starts the "previous" animation. Does NOT update the index here anymore.
  const handlePrev = () => {
    if (!animationDirection) {
      setAnimationDirection("prev");
    }
  };

  const openVideoModal = (videoFileName) => {
    setModalVideoSrc(`${publicUrl}/${videoFileName}`);
  };

  const closeModal = () => {
    setModalVideoSrc(null);
  };

  // --- Calculated values for rendering ---
  const currentSlide = slides[currentIndex];
  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  const galleryClassName = `gallery ${
    animationDirection ? `animating-${animationDirection}` : ""
  }`;
return(
  <section className="portfolio-section" id="portfolio">
  <div className="container" style={{ overflow: "hidden" }}>
    <Reveal>
      <div className="testimonial">
        <div className="image-container">
          <img src={`${publicUrl}/small.png`} alt="GigaChad profile" />
        </div>
        <div className="testimonial-text">
          <span className="testimonial-author">GigaChad Says:</span>
          <p>
            Asked an edit and got a masterpiece. This guy knows what he's
            doing!
          </p>
        </div>
      </div>

      <img
        src={`${publicUrl}/down.png`}
        className="nav-chevron down"
        alt="down arrow"
      />
    </Reveal>

        <Reveal>
          <div className="gallery-container">
            <div className={galleryClassName}>
              <div
                className="thumbnail-wrapper prev-wrapper"
                onClick={handlePrev}
              >
                <img
                  key={`prev-thumb-${prevIndex}`}
                  src={`${publicUrl}/${slides[prevIndex].thumbnail}`}
                  alt="Previous video thumbnail"
                />
              </div>

              <div className="thumbnail-wrapper main-wrapper">
                <img
                  key={`main-thumb-${currentIndex}`}
                  src={`${publicUrl}/${currentSlide.thumbnail}`}
                  alt="Main video thumbnail"
                />
                <button
                  className="play-button"
                  onClick={() => openVideoModal(currentSlide.mainVideo)}
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#d2ad75" strokeWidth="1"/>
                    <path d="M9.5 8L16.5 12L9.5 16V8Z" fill="#d2ad75"/>
                  </svg>
                </button>
              </div>

              <div
                className="thumbnail-wrapper next-wrapper"
                onClick={handleNext}
              >
                <img
                  key={`next-thumb-${nextIndex}`}
                  src={`${publicUrl}/${slides[nextIndex].thumbnail}`}
                  alt="Next video thumbnail"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div
            className="flex-portfolio"
            style={{
              opacity: animationDirection ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <img src="./text_center.png" alt="Section title" />
            <p className="subtitle">
              We cater to clients of every scale, always upholding a standard of
              excellence.
            </p>
            <a href="#contact" className="portfolio-btn">
              Contact Me
            </a>
          </div>
        </Reveal>
      </div>

      {/* Full-screen video modal */}
      {modalVideoSrc && (
        <div className="video-modal-overlay" onClick={closeModal}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={modalVideoSrc}
              controls
              autoPlay
              playsInline
              className="full-screen-video"
              onEnded={closeModal}
            />
            <button className="close-modal-button" onClick={closeModal}>
              <img src="./minimize.png" alt="" className="minimize" />
            </button>
            {/* add here a button for muting, give it a glow of d2ad75 */}
            {/* there should be no other buttons, only simplistic and the progress bar in the video should also be customize of my color which is d2ad75 */}
          </div>
        </div>
      )}
    </section>

);
};

export default PortfolioDesktop;