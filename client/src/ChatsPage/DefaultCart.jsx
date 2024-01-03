import React from "react";
import { motion } from "framer-motion"





const DefaultCart = () => {
  const startAnimation = {
     opacity: [0,1], // Fade out during the exit animation
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  };
  const exitAnimation = {
    // Define the exit animation by changing the y property
    opacity: [1,0], // Fade out during the exit animation
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      className="chat__conversation-board-default"
      animate={startAnimation}
      // exit={exitAnimation}
    >
      <h1>Start messeging with end to end encryption </h1>
    </motion.div>
  );
};

export default DefaultCart;
