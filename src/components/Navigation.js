import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';
import useSound from 'use-sound';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
function Navigation() {
    const [navActive, setNavActive] = useState(false);
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});

    return (
        <>
        <Container fluid className='mt-5'>
            <motion.div 
                style={{ 
                    float: 'right',
                    cursor: 'pointer' 
                }} 
                onMouseDown={playClick}
                onMouseEnter={playPop}
                onClick={() => setNavActive(true)}
            >
                <i 
                    style={{ 
                        position: 'absolute',
                        backgroundColor: '#5879e4', 
                        color: 'white',
                        padding: 20,
                        borderRadius: 100,
                        right: 20,
                    }}
                    className="fa-solid fa-bars"         
                ></i>
            </motion.div>
        </Container>
        <Container 
            className='sidebar'
            style={{ display: navActive ? 'block' : 'none' }}
        >  
            <Col 
                style={{ 
                    cursor: 'pointer' 
                }} 
                onClick={() => setNavActive(false)}
                onMouseDown={playClick}
                onMouseEnter={playPop}
            > 
                <i 
                    style={{ 
                        position: 'absolute',
                        backgroundColor: 'white', 
                        color: '#5879e4',
                        padding: 20,
                        borderRadius: 100,
                        right: 20,
                        top: 48,    
                    }}
                    className="fa-solid fa-xmark"             
                ></i>
                <Sidebar />
            </Col>
        </Container>
        </>
    );
}

export default Navigation;