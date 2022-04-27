import { motion } from 'framer-motion';
import useSound from 'use-sound';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';
import { useState } from 'react';

function Loader() {
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});
    const [isClicked, setIsClicked] = useState(false);
    document.body.style.backgroundColor = "#FFF2F2";

    const checkIfMounted = () => {
        if (isClicked) {
        }
    }

    return (
        <motion.div 
            style={{ 
                display: isClicked ? "none" : "initial",
                position: "absolute", 
                top: "50%", 
                left: "50%",
                cursor: 'grab',
                textAlign: 'center'
            }}
            drag
            onDragEnd 
            dragConstraints={{ 
                left: -250,
                right: 550,
                top: -300, 
                bottom: 250, 
            }}
        >
            <motion.h1 className='text-uppercase'>
                Disneyland Paris 
            </motion.h1>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="up active"
                onMouseDown={playClick}
                onMouseEnter={playPop}
                style={{ borderRadius: 100 }}
                onClick={() => setIsClicked(true)}
            >
                Voir les temps d'attente       
            </motion.button>
        </motion.div> 
    );
}

export default Loader;