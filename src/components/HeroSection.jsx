import React from "react";

const HeroSection = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="flex-heading">
            <h1>The Creed</h1>
            <h2>The Creative Agency</h2>
          </div>
          <div className="flex-sub">
            <p>
              "We produce videos as captivating and{" "}
              <span id="bl">
                {" "}
                refined as classical <span id="greek">Greek</span> art."
              </span>
            </p>
            <a href="#contact" className="btn">
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={`${publicUrl}/main.png`}
            alt="Statue of Perseus with the Head of Medusa"
          />
          <h3>We Sculpt Visual Art...</h3>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
