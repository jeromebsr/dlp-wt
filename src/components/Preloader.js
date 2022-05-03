import React, { useState } from 'react';
import { motion } from 'framer-motion';
import bgVideo from '../assets/videos/bg.mp4';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';
import useSound from 'use-sound';

function Preloader() {
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});
    const [isClicked, setIsClicked] = useState(false);
    return (
        <div>
           <video autoPlay loop muted id='video'>
                <source src={bgVideo} type='video/mp4' />
            </video>
            <motion.div 
                style={{ 
                    display: isClicked ? "none" : "block",
                    position: "absolute", 
                    top: "50%", 
                    left: "50%",
                    cursor: 'grab',
                }}
                drag
                onDragEnd 
                dragConstraints={{ 
                    left: -10,
                    right: 10,
                    top: -10, 
                    bottom: 10, 
                }}
            >
                <motion.h1 id='background' className='text-uppercase text-center'>
                    Disneyland Paris 
                </motion.h1>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="up active"
                    onMouseDown={playClick}
                    onMouseEnter={playPop}
                    style={{ borderRadius: 100, marginLeft: -120 }}
                    onClick={() => setIsClicked(true)}
                >
                    Voir les temps d'attente       
                </motion.button>
            </motion.div> 
        </div>
    );
}

export default Preloader;