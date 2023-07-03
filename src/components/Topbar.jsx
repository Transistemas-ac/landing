import { useEffect, useRef, useContext } from 'react';
import { Links } from '../routes';
import { DisplayContext } from '../utils/DisplayProvider';

import transistemasLogo from '../assets/svg/logo_transistemas.svg';

function Topbar() {

    const display = useContext(DisplayContext);
    const progressBar = useRef();
    const topbarContainer = useRef();
    const topbar = useRef();
    const links = useRef();


    function updateProgrresBar() {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
        progressBar.current.style.width = scrollPercent;

        window.requestAnimationFrame(updateProgrresBar);
    }

    function toggleMenu(e) {
        if (display) return
        document.body.classList.toggle("menu-open");
        topbarContainer.current.classList.toggle("menu-open")
    }

    useEffect(() => {
        window.requestAnimationFrame(updateProgrresBar);
    })

    useEffect(() => {
        if (display) topbar.current.appendChild(links.current);
        else topbarContainer.current.appendChild(links.current);
    }, [display])


    return (
        <div ref={topbarContainer} className="topbar-container">

            <div ref={progressBar} className="progress-bar"></div>

            <div className="topbar" ref={topbar}>
                <img src={transistemasLogo} alt="logo" />
                <div className="topbar__menu-button" onClick={(e) => { toggleMenu(e) }}>
                    <div className='topbar__menu-icon'></div>
                </div>
            </div>

            <ul className="menu" ref={links}>
                <Links onClick={(e) => { toggleMenu(e) }} />
            </ul>
        </div>
    );
}

export default Topbar;