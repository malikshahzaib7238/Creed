import React from "react";
import { motion } from "framer-motion";

/**
 * A reusable component to animate its children when they scroll into view.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The content to animate.
 * @param {number} [props.delay=0] Optional delay for the animation.
 * @param {number} [props.yOffset=80] The vertical distance the element moves from.
 * @param {string} [props.className] Optional CSS classes.
 */
const Reveal = ({ children, delay = 0, yOffset = 75, className }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: yOffset },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
          delay: delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
