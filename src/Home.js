import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import WaitTime from './components/WaitTime';
import Schedule from './components/Schedule';
import { motion } from 'framer-motion';
import popSfx from './assets/sounds/pop.wav';
import clickSfx from './assets/sounds/click.wav';
import useSound from 'use-sound';
import Player from './components/Player';

function Home() {  
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});
    const [isClicked, setIsClicked] = useState(false);
    return (
        <AnimatePresence>
            <Container 
                style={{ 
                    display: isClicked ? "" : "none" 
                }}>
                <Player />
                <Row>
                    <Col md={8}>
                        <WaitTime />
                    </Col>
                    <Col md={4}>
                        <Schedule />
                    </Col>
                </Row>
            </Container>
            <motion.div 
                style={{ 
                    display: isClicked ? "none" : "",
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
    </AnimatePresence>
    );
}

export default Home;