import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import music from '../assets/sounds/music.mp3';

function Player() {
    const [audio] = useState(new Audio(music));
    const [playing, setPlaying] = useState(true);

    const toggle = () => {
        playing ? audio.play() : audio.pause();
    }

    useEffect(() => {
        audio.volume = 0.1;
        toggle();
    })
    
    return (
        <Container 
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
        </Container>
    );
}

export default Player;