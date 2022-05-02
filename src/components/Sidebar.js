import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useSound from 'use-sound';
import popSfx from '../assets/sounds/pop.wav';
import clickSfx from '../assets/sounds/click.wav';

function Sidebar() {
    const [playPop] = useSound(popSfx, {volume: 0.1});
    const [playClick] = useSound(clickSfx, {volume: 0.5});
    return (
        <ul>
            <NavLink
                to="/" 
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onMouseEnter={playPop}
                onMouseDown={playClick}
            >
                <li>Temps d'attente</li>
            </NavLink>
       
            <NavLink
                to="/calendar" 
                className={(nav) => (nav.isActive ? "nav-active" : "")}
                onMouseEnter={playPop}
                onMouseDown={playClick}
            >
                <li>Calendrier</li>
            </NavLink>
       </ul>
    );
}

export default Sidebar;