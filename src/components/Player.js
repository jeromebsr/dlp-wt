import React, { useEffect, useState } from 'react';
import music from '../assets/sounds/music.mp3';

function Player({ start }) {
    const [audio] = useState(new Audio(music));
    const [playing, setPlaying] = useState();
    
    const toggle = setInterval(() => {
        setPlaying(!playing)
    }, 3000);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing]);
    
    return (
        <div>
            <i 
                style={{ cursor: 'pointer' }} 
                onClick={() => toggle} 
                className={ playing ? 'fa-solid fa-pause fa-2x' : 'fa-solid fa-play fa-2x'}
            ></i>           
        </div>
    );
}

export default Player;