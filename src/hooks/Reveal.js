// Reveal.js

import React from "react";
import { motion, noop, scale } from "framer-motion";

/**
 * A reusable component to animate its children when they scroll into view.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The content to animate.
 * @param {string} [props.className] Optional CSS classes to apply to the component.
 * @param {number} [props.delay=0] Optional delay for the animation.
 * @param {string} [props.direction="up"] The direction the element moves from.
 * @param {number} [props.distance=80] The distance the element moves from.
 * @param {number} [props.rotate=0] The static rotation to apply throughout the animation.
 *
 */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 80,
  rotate = 0,
  scale=1,
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      rotate: rotate, // <-- Apply rotation in the hidden state
      // translateY: translateY,
      scale:scale
    },
    visible: {

      opacity: 1,
      x: 0,
      y: 0,
      rotate: rotate, // <-- Apply rotation in the visible state
      // translateY:translateY,
      scale: scale
    },
  };


  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 12,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;