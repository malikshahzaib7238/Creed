import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // <-- Import motion

const Header = ({ navLinks = [] }) => {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    // Wrap the entire header in a motion.div
    <motion.header
      className="main-header"
      id="top"
      // Animate from being 100px above the screen and invisible
      initial={{ y: -100, opacity: 0 }}
      // Animate to its final position and full visibility
      animate={{ y: 0, opacity: 1 }}
      // Use a spring transition for a smooth, non-jelly slide-in
      transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.2 }}
    >
      <div className="logo">
        <img src={`${publicUrl}/icon.png`} alt="The Creed Logo" />
      </div>
      <nav>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.path.startsWith("/#") ? (
                <a href={link.path}>{link.label}</a>
              ) : (
                <Link to={link.path}>{link.label}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;