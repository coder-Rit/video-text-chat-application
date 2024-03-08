import React from 'react'
import { motion } from 'framer-motion';
const Logo = () => {

    const CHARLAR: string[] = "CHARLAR".split("");
    const Tagline: string[] = "Chat Call Fun!".split(" ");

    return (
        <div className='logoDiv'>
            <img  className='animatedLogo' src="./images/charlar-logo.png" alt=""

            />
            <div>
                <span className='logoName'>
                    {CHARLAR.map((el, i) => (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: i / 10,
                            }}
                            key={i}
                        >
                            {el}{""}
                        </motion.span>
                    ))}

                </span>
                <span className='logoLIne'> {Tagline.map((el, i) => (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: i / 10,
                        }}
                        key={i}
                    >
                        {el}{" "}
                    </motion.span>
                ))}</span>
            </div>
        </div>
    )
}

export default Logo