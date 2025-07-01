import React, { useState, useEffect, useRef } from "react";
import Reveal from "../hooks/Reveal";
import useWindowSize from "../hooks/useWindowSize";
import "../styles/index.css";

const slides = [
  {
    mainVideo: "vid1.mp4",
    thumbnail: "./thumbnail1.jpg",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid2.mp4",
    thumbnail: "./thumbnail2.jpg",
    titleImage: "text_center.png",
    subtitleText: "Our work is crafted with precision and passion.",
  },
  {
    mainVideo: "vid3.mp4",
    thumbnail: "./thumbnail3.jpg",
    titleImage: "text_center.png",
    subtitleText: "Delivering dynamic visuals that captivate and engage.",
  },
  {
    mainVideo: "vid4.mp4",
    thumbnail: "./thumbnail4.jpg",
    titleImage: "text_center.png",
    subtitleText: "Excellence is not an act, but a habit.",
  },
  {
    mainVideo: "vid5.mp4",
    thumbnail: "./thumbnail5.jpg",
    titleImage: "text_center.png",
    subtitleText: "Pushing the boundaries of creative video editing.",
  },
  {
    mainVideo: "vid6.mp4",
    thumbnail: "./thumbnail6.jpg",
    titleImage: "text_center.png",
    subtitleText: "Your vision, brought to life with stunning visuals.",
  },
];

const PortfolioDesktop = () => {
  const { isMobile } = useWindowSize();

  const publicUrl = process.env.PUBLIC_URL;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const mainVideoRef = useRef(null);

  const [canVideoPlay, setCanVideoPlay] = useState(false);

  // CHANGE: Simplified useEffect to control video playback
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => setIsFading(false), 300);
      return () => clearTimeout(timer);
    }

    const videoElement = mainVideoRef.current;
    if (videoElement) {
      // Play only if the component is revealed and not currently fading
      if (canVideoPlay && !isFading) {
        videoElement.load();
        videoElement.play().catch((error) => {
          console.warn("Video play was prevented:", error);
        });
      } else {
        // Pause if the component is hidden or fading
        videoElement.pause();
      }
    }
  }, [isFading, currentIndex, canVideoPlay]); // Depend on our new state

  const handleNext = () => {
    if (!isFading) {
      setIsFading(true);

      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }
  };

  const handlePrev = () => {
    if (!isFading) {
      setIsFading(true);

      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
      );
    }
  };

  const handleSideVideoClick = (indexToMakeMain) => {
    if (!isFading && indexToMakeMain !== currentIndex) {
      setIsFading(true);
      setCurrentIndex(indexToMakeMain);
    }
  };

  const currentSlide = slides[currentIndex];

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  return (
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
        </Reveal>

        <Reveal>
          <img
            src={`${publicUrl}/down.png`}
            className="nav-chevron down"
            alt="down arrow"
          />
        </Reveal>

        <Reveal
          onRevealComplete={() => setCanVideoPlay(true)}
          onHideComplete={() => setCanVideoPlay(false)}
        >
          <div className="gallery">
            {/* Left Arrow (hidden on large screens via CSS) */}
            <img
              className="left"
              onClick={handlePrev}
              src="/left.png"
              alt="Previous video"
            />

            {/* Previous Video (left side) */}

            {/* <video
              key={`prev-${prevIndex}`}
              src={`${publicUrl}/${slides[prevIndex].mainVideo}`}
              className="side-image"
              // loop
              // muted
              autoPlay
              playsInline
              preload="auto"
              onClick={() => handleSideVideoClick(prevIndex)}
              style={{ zIndex: -1 }}
            /> */}

            {/* Main Video (center) */}
            <video
              key={`main-${currentIndex}`}
              ref={mainVideoRef}
              src={`${publicUrl}/${currentSlide.mainVideo}`}
              className="main-image"
              autoPlay
              // loop
              // muted
              playsInline
              preload="auto"
              style={{ opacity: isFading ? 0 : 1, zIndex: -100 }}
            />
            <div>I am desktop</div>

            {/* Next Video (right side) */}
            <video
              key={`next-${nextIndex}`}
              src={`${publicUrl}/${slides[nextIndex].mainVideo}`}
              className="side-image"
              // loop
              // muted
              playsInline
              preload="auto"
              onClick={() => handleSideVideoClick(nextIndex)}
            />

            {/* Right Arrow (hidden on large screens via CSS) */}
            <img
              className="right"
              onClick={handleNext}
              src="/right.png"
              alt="Next video"
            />
          </div>
        </Reveal>

        <Reveal>
          <div className="flex-portfolio">
            <img
              src={`${publicUrl}/${currentSlide.titleImage}`}
              alt="Section title"
              style={{ opacity: isFading ? 0 : 1 }}
            />
            <p className="subtitle" style={{ opacity: isFading ? 0 : 1 }}>
              {currentSlide.subtitleText}
            </p>
            <a href="#contact" className="portfolio-btn">
              Contact Me
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PortfolioDesktop;
