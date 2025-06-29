import React, { useState, useEffect, useRef } from "react";
import Reveal from "../hooks/Reveal";
import "../styles/index.css";

const slides = [
  {
    mainVideo: "vid1.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid2.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid3.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid4.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid5.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainVideo: "vid6.mp4",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
];

const PortfolioSection = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const cursorBladeRef = useRef(null);
  const cursorParticleRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const mainVideoRef = useRef(null);

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setIsFading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else if (mainVideoRef.current) {
      mainVideoRef.current.load();
      mainVideoRef.current.play().catch((error) => {
        console.warn("Video play was interrupted or failed:", error);
      });
    }
  }, [isFading, currentIndex]);

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

  useEffect(() => {
    const videos = document.querySelectorAll(".gallery video");
    const customCursorBlade = cursorBladeRef.current;
    const customCursorParticle = cursorParticleRef.current;

    const originalBladeZIndex = customCursorBlade
      ? getComputedStyle(customCursorBlade).zIndex
      : "auto";
    const originalParticleZIndex = customCursorParticle
      ? getComputedStyle(customCursorParticle).zIndex
      : "auto";

    const highZIndex = "99999999999999";

    const handleMouseEnter = () => {
      if (customCursorBlade) {
        customCursorBlade.style.zIndex = highZIndex;
      }
      if (customCursorParticle) {
        customCursorParticle.style.zIndex = (
          parseInt(highZIndex) - 1
        ).toString();
      }
    };

    const handleMouseLeave = () => {
      if (customCursorBlade) {
        customCursorBlade.style.zIndex = originalBladeZIndex;
      }
      if (customCursorParticle) {
        customCursorParticle.style.zIndex = originalParticleZIndex;
      }
    };

    videos.forEach((video) => {
      video.addEventListener("mouseenter", handleMouseEnter);
      video.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      videos.forEach((video) => {
        video.removeEventListener("mouseenter", handleMouseEnter);
        video.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  const currentSlide = slides[currentIndex];

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  const renderVideos = () => {
    return slides.map((slide, index) => {
      let videoClassName = "gallery-video";
      let zIndex = 1;

      if (index === currentIndex) {
        videoClassName += " main-video";
        zIndex = 10;
      } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
        videoClassName += " side-video prev-video";
        zIndex = 5;
      } else if (index === (currentIndex + 1) % slides.length) {
        videoClassName += " side-video next-video";
        zIndex = 5;
      } else {
        videoClassName += " hidden-video";
        zIndex = 1;
      }
    });
  };
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

        <Reveal>
          <div className="gallery">
            {/* Left Arrow (hidden on large screens via CSS) */}
            <img
              className="left"
              onClick={handlePrev}
              src="/left.png"
              alt="Previous video"
            />

            {/* Previous Video (left side) */}
            {renderVideos()}

            <video
              key={`prev-${prevIndex}`}
              src={`${publicUrl}/${slides[prevIndex].mainVideo}`}
              className="side-image"
              loop
              playsInline
              preload="auto"
              onClick={() => handleSideVideoClick(prevIndex)}
              style={{ zIndex: -1 }}
            />

            {/* Main Video (center) */}
            <video
              key={`main-${currentIndex}`}
              ref={mainVideoRef}
              src={`${publicUrl}/${currentSlide.mainVideo}`}
              className="main-image"
              autoPlay
              loop
              playsInline
              preload="auto"
              style={{ opacity: isFading ? 0 : 1, zIndex: -100 }}
            />

            {/* Next Video (right side) */}
            <video
              key={`next-${nextIndex}`}
              src={`${publicUrl}/${slides[nextIndex].mainVideo}`}
              className="side-image"
              loop
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

export default PortfolioSection;
