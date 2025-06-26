import React from "react";
import Reveal from "./Reveal";

const HeroSection = () => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          {/* Left side remains the same */}
          <Reveal>
            <div className="flex-heading">
              <h1>The Creed</h1>
              <h2>The Creative Agency</h2>
            </div>
          </Reveal>
          <div className="flex-sub">
            <Reveal delay={0.2}>
              <p>
                "We produce videos as captivating and{" "}
                <span id="bl">
                  {" "}
                  refined as classical <span id="greek">Greek</span> art."
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a href="#contact" className="btn">
                Contact Me
              </a>
            </Reveal>
          </div>
        </div>

        {/* --- THE FIX IS HERE --- */}
        {/* We wrap the entire container div, not the individual elements inside */}
        <div className="hero-image" delay={0.3} yOffset={50}>
          {/* These elements are now direct children, their layout is preserved */}
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
