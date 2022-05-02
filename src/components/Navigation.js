import React, { useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';
import useSound from 'use-sound';
import Sidebar from '../components/Sidebar';

function Navigation() {
    const [navActive, setNavActive] = useState(false);
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});

    return (
        <>
        <Container fluid className='mt-3'>
            <Col 
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
                        right: 20
                    }}
                    class="fa-solid fa-bars"         
                ></i>
            </Col>
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
            > 
                <i 
                    style={{ 
                        float: 'right',
                        backgroundColor: 'white', 
                        color: '#5879e4',
                        padding: 20,
                        borderRadius: 100
                    }}
                    class="fa-solid fa-xmark"             
                ></i>
                <Sidebar />
            </Col>
        </Container>
        </>
    );
}

export default Navigation;