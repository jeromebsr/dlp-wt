import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import music from '../assets/sounds/music.mp3';

function Player() {
    const [audio] = useState(new Audio(music));
    const [playing, setPlaying] = useState(true);

    const toggle = () => {
        playing ? audio.play() : audio.pause();
    }
    const variants = {
        initial: {
            opacity: 0,
            trasition: {duration: 0.5},
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
        },
        exit: {
            opacity: 0,
            transition: { duuration: 0.3 },
            x: -100,
        }
    }
    
    useEffect(() => {
        audio.volume = 0.1;
        toggle();
    })
    
    return (
        <motion.div
        transition={{ ease: "easeOut", duration: 1 }}
            initial="initial"
            animate="visible" 
            exit="exit"
            variants={variants}
            style={{ 
                display: 'block',
                position: 'fixed',
                color: 'black',
                borderRadius: 100,
                right: 95,
                top: 60,
                zIndex: 2,
                width: 1
            }}
        >
            <i 
                style={{ cursor: 'pointer' }} 
                onClick={() => setPlaying(!playing)} 
                className={ playing ? 'fa-solid fa-pause fa-2x' : 'fa-solid fa-play fa-2x'}
            ></i>           
        </motion.div>
    );
}

export default Player;