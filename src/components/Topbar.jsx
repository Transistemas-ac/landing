import { useState, useEffect, useRef } from 'react';
import { Links } from '../routes';

import transistemasLogo from '../assets/svg/logo_transistemas.svg';

import Button from './Button';

function Topbar() {

    const topbar = useRef();
    const progressBar = useRef();

    /*
        evento => scrolle 
    */

    function updateProgrresBar() {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
        progressBar.current.style.width = scrollPercent;

        window.requestAnimationFrame(updateProgrresBar);
    }

    function toggleMenu(e) {
        document.body.classList.toggle("menu-open");
        topbar.current.classList.toggle("menu-open")
    }

    useEffect(() => {
        window.requestAnimationFrame(updateProgrresBar);
    }, [])

    return (
        <div ref={topbar} className="topbar-container">

            <div className="progress-bar-container">
                <div ref={progressBar} className="progress-bar"></div>
            </div>

            <div className="topbar">
                <img src={transistemasLogo} alt="logo" />
                <div className="topbar__menu-button" onClick={(e) => { toggleMenu(e) }}>
                    <div className='topbar__menu-icon'></div>
                </div>
            </div>

            <nav className="menu">
                <ul className="menu__links-container">

                    <Links onClick={(e) => { toggleMenu(e) }} />

                    <li className="menu__link">
                        <Button href="/donar">Donar</Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;