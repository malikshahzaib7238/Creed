import React, { useState, useEffect } from 'react';

// The slider data, which was in the original JS file
const slides = [
    {
        mainImage: "midmain.png",
        titleImage: "text_center.png",
        subtitleText: "We cater to clients of every scale, always upholding a standard of excellence.",
    },
    {
        mainImage: "midside.png",
        titleImage: "text_center.png",
        subtitleText: "Our second sculpture explores the theme of heroic triumph.",
    }
];

const PortfolioSection = () => {
    const publicUrl = process.env.PUBLIC_URL;

    // State to track the current slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State to manage the fade-out/fade-in animation
    const [isFading, setIsFading] = useState(false);

    // Effect to handle the slide change after the fade-out
    useEffect(() => {
        if (isFading) {
            // After 300ms (the duration of the CSS opacity transition),
            // change the content and start the fade-in.
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
            // The useEffect above will handle the rest
        }
    };

    const handlePrev = () => {
        if (!isFading) {
            // A bit more logic for prev to avoid negative numbers
             const timer = setTimeout(() => {
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                setCurrentIndex(prevIndex);
                setIsFading(false);
            }, 300);
            setIsFading(true);
            return () => clearTimeout(timer);
        }
    };
    
    // Get the current slide's data
    const currentSlide = slides[currentIndex];

    return (
        <section className="portfolio-section" id="portfolio">
            <div className="container">
                <div className="testimonial">
                    <div className="image-container">
                        <img src={`${publicUrl}/small.png`} alt="GigaChad profile" />
                    </div>
                    <div className="testimonial-text">
                        <span className="testimonial-author">GigaChad Says:</span>
                        <p>Asked an edit and got a masterpiece. This guy knows what he's doing!</p>
                    </div>
                </div>

                <img src={`${publicUrl}/down.png`} className="nav-chevron down" alt="down arrow"/>

                <div className="gallery">
                    <img className="left" src={`${publicUrl}/left.png`} alt="Previous" onClick={handlePrev} style={{ cursor: 'pointer' }}/>
                    <img src={`${publicUrl}/midside.png`} alt="Sculpture detail one" className="side-image" />
                    
                    {/* These elements are now controlled by React state */}
                    <img 
                        src={`${publicUrl}/${currentSlide.mainImage}`} 
                        alt="Main sculpture" 
                        className="main-image"
                        style={{ opacity: isFading ? 0 : 1 }} 
                    />

                    <img src={`${publicUrl}/midside.png`} alt="Sculpture detail two" className="side-image" />
                    <img className="right" src={`${publicUrl}/right.png`} alt="Next" onClick={handleNext} style={{ cursor: 'pointer' }}/>
                </div>
                <div className="flex-portfolio">
                    <img 
                        src={`${publicUrl}/${currentSlide.titleImage}`} 
                        alt=""
                        style={{ opacity: isFading ? 0 : 1 }} 
                    />
                    <p 
                        className="subtitle"
                        style={{ opacity: isFading ? 0 : 1 }}
                    >
                        {currentSlide.subtitleText}
                    </p>
                    <a href="#contact" className="portfolio-btn">Contact Me</a>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;