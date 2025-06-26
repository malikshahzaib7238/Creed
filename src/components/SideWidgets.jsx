import React from "react";
import { motion } from "framer-motion"; // <-- Import motion

const SideWidgets = () => {
  const publicUrl = process.env.PUBLIC_URL;

  const widgetVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const textWidgetVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      <motion.div
        className="side-icons-left"
        initial="hidden"
        animate="visible"
        transition={{ type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.2, delayChildren: 0.5 }}
      >
        <motion.img variants={widgetVariants} src={`${publicUrl}/icon.png`} alt="Icon" id="icon" />
        <motion.a variants={widgetVariants} href="tel:+923020887777">
          <img src={`${publicUrl}/phone.png`} alt="Phone" />
        </motion.a>
        <motion.a variants={widgetVariants} href="mailto:alisocial233@gmail.com">
          <img src={`${publicUrl}/mail.png`} alt="Mail" />
        </motion.a>
      </motion.div>

      {/* Each vertical text widget gets its own animation */}
      <motion.div
        className="vertical-text-widget-"
        variants={textWidgetVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <p>delivering perfection</p>
      </motion.div>
      <motion.div
        className="vertical-text-widget-2"
        variants={textWidgetVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <p>voice your needs</p>
      </motion.div>
      <motion.div
        className="vertical-text-widget-small"
        variants={textWidgetVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <p>know your contacts</p>
      </motion.div>
    </>
  );
};

export default SideWidgets;