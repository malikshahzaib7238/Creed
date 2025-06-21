// src/components/CustomCursor.js

import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";

import bladeImg from "../assets/spear-blade.png";

const CustomCursor = () => {


    useEffect(() => {
        const handleTouchMove = (event) => {
          const touch = event.touches[0];
          if (!touch) return;

          const x = touch.clientX + window.scrollX;
          const y = touch.clientY + window.scrollY;

          const trail = document.createElement('span');
          trail.className = 'gold-trail';
          trail.style.left = `${x}px`;
          trail.style.top = `${y}px`;

          document.body.appendChild(trail);
          setTimeout(() => trail.remove(), 1000); // remove after 1s
        };
        // window.addEventListener('drag', handleTouchMove);
        window.addEventListener('touchmove', handleTouchMove);
        return () => window.removeEventListener('touchmove', handleTouchMove);
      }, []);

  const [styles, api] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 1, tension: 350, friction: 25 },
  }));

  let lastSpawnTime = 0;

  const spawnParticle = (x, y) => {
    const now = Date.now();
    if (now - lastSpawnTime < 40) return; // throttle rate (25fps max)
    lastSpawnTime = now;

    const particle = document.createElement("span");
    particle.className = "cursor-particle";

    // Size and shape
    const width = Math.random() * 10 + 8; // 6–10px wide
    const height = Math.random() * 8 + 10; // 10–18px tall
    particle.style.width = `${width}px`;
    particle.style.height = `${height}px`;

    // Flame gradient colors (vibrant, orangish)
    const gradients = [
      "radial-gradient(ellipse at center, #ff9d00 0%, #ff4500 50%, transparent 100%)",
      "radial-gradient(ellipse at center, #ffa200 0%, #ff3300 60%, transparent 100%)",
      "radial-gradient(ellipse at center, #ffc400 0%, #ff6600 60%, transparent 100%)",
    ];
    particle.style.background =
      gradients[Math.floor(Math.random() * gradients.length)];

    // Scatter range (farther)
    const scatterX = Math.random() * -50 - 0; // -10 to -70px
    const scatterY = Math.random() * 70 - 50; // -40 to +40px
    particle.style.setProperty("--scatter-x", `${scatterX}px`);
    particle.style.setProperty("--scatter-y", `${scatterY}px`);

    // Position
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    // Glow opacity
    particle.style.opacity = Math.random() * 0.3 + 0.7; // 0.7–1

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1400); // longer particle life
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      api.start({ xy: [clientX, clientY] });
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      spawnParticle(clientX + scrollX + 75, clientY + scrollY + 75);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [api]);

  return (
    <animated.div
      className="cursor-blade"
      style={{
        transform: styles.xy.to(
          (x, y) => `translate3d(${x - 0}px, ${y - 0}px, 0)`
        ),
      }}
    >
      <img src={bladeImg} alt="cursor" />
    </animated.div>
  );
};

export default CustomCursor;
