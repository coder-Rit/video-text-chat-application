import React from "react";
import { motion } from "framer-motion"
import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';




const DefaultCart = () => {
  const startAnimation = {
    opacity: [0, 1], // Fade out during the exit animation
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  };
  const exitAnimation = {
    // Define the exit animation by changing the y property
    opacity: [1, 0], // Fade out during the exit animation
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
      <DotLottiePlayer
        src="./images/startChat.lottie"
        autoplay
        loop
        style={{ width: "300px",height:"300px" }}
        speed={1.5}
      >
      </DotLottiePlayer>
      <p>End-to-End Encryption Charler</p>
    </motion.div>
  );
};

export default DefaultCart;
