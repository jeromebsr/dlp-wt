import React, { useEffect, useState } from 'react';
import music from '../assets/sounds/music.mp3';

function Player() {
    const [audio] = useState(new Audio(music));
    const [playing, setPlaying] = useState(true);

    const toggle = () => {
        playing ? audio.play() : audio.pause();
    }

    useEffect(() => {
        toggle();
    })
    
    return (
        <div>
            <i 
                style={{ cursor: 'pointer' }} 
                onClick={() => setPlaying(!playing)} 
                className={ playing ? 'fa-solid fa-pause fa-2x' : 'fa-solid fa-play fa-2x'}
            ></i>           
        </div>
    );
}

export default Player;