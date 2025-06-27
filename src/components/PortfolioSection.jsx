import React, { useState, useEffect } from "react";
import Reveal from "../hooks/Reveal";
import "../styles/index.css"
const slides = [
  {
    mainImage: "midmain.png",
    titleImage: "text_center.png",
    subtitleText:
      "We cater to clients of every scale, always upholding a standard of excellence.",
  },
  {
    mainImage: "midside.png",
    titleImage: "text_center.png",
    subtitleText: "Our second sculpture explores the theme of heroic triumph.",
  },
];

const PortfolioSection = () => {
  const publicUrl = process.env.PUBLIC_URL;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setIsFading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFading, currentIndex]);

  const handleNext = () => {
    if (!isFading) {
      setIsFading(true);
    }
  };

  const handlePrev = () => {
    if (!isFading) {
      const timer = setTimeout(() => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
        setIsFading(false);
      }, 300);
      setIsFading(true);
      return () => clearTimeout(timer);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="portfolio-section" id="portfolio" >
      <div className="container" style={{ overflow: 'hidden' }}>
        {/* Wrap the testimonial block */}
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

        {/* Wrap the chevron arrow */}
        <Reveal >
          <img
            src={`${publicUrl}/down.png`}
            className="nav-chevron down"
            alt="down arrow"
          />
        </Reveal>

        {/* Wrap the entire gallery container */}
        <Reveal>
        <div className="gallery" >

        <img
            className="left" /* ... */ onClick={handlePrev} src="/left.png"
          />
          <img
            src={`${publicUrl}/midside.png`} /* ... */ className="side-image"
          />
          <img
            src={`${publicUrl}/${currentSlide.mainImage}`} /* ... */
            className="main-image"
            style={{ opacity: isFading ? 0 : 1 }}
          />
          <img
            src={`${publicUrl}/midside.png`} /* ... */ className="side-image"
          />
          <img
            className="right" /* ... */ onClick={handleNext} src="/right.png"
          />
          </div>
        </Reveal>

        {/* Wrap the bottom text and button block */}
<Reveal>
          <div className="flex-portfolio">
            <img
              src={`${publicUrl}/${currentSlide.titleImage}`}
              alt=""
              style={{ opacity: isFading ? 0 : 1 }}
            />
            <p className="subtitle" style={{ opacity: isFading ? 0 : 1 }}>
              {currentSlide.subtitleText}
            </p>
            <a href="#contact" className="portfolio-btn">
              Contact Me
            </a>
            {/* </Reveal> */}
      {/* </Reveal> */}
      </div>
      </Reveal>
          </div>
    </section>
  );
};

export default PortfolioSection;