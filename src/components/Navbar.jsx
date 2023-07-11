import { useEffect, useRef, useContext, useState } from 'react';
import { NavbarLinks } from '../routes';
import { DisplayContext } from '../utils/DisplayProvider';

import transistemasLogo from '../assets/svg/logo_transistemas.svg';
import { Link } from 'react-router-dom';

function Navbar() {

    const isMobile = useContext(DisplayContext);
    const [expanded, setExpanded] = useState(false);
    const [progress, setProgress] = useState('0%');

    const navbar = useRef();
    const innerContainer = useRef();
    const links = useRef();

    const updateProgrresBar = () => {
        const { scrollTop, scrollHeight } = document.documentElement;
        const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
        setProgress(scrollPercent)
        window.requestAnimationFrame(updateProgrresBar);
    }

    useEffect(() => {
        window.requestAnimationFrame(updateProgrresBar);
    }, [])


    const toggleMenu = () => {
        if (!isMobile) return
        document.body.classList.toggle('navbar--expanded')
        setExpanded(!expanded)
    }

    useEffect(() => {
        if (!isMobile) innerContainer.current.appendChild(links.current);
        else navbar.current.appendChild(links.current);
    }, [isMobile])


    return (
        <nav ref={navbar} className={`navbar ${expanded ? 'navbar--expanded' : ''}`}>

            <div style={{ width: `${progress}` }} className='navbar__progress-bar'></div>

            <div ref={innerContainer} className='navbar__inner-container'>
                <Link to={'/'} className='navbar__logo'>
                    <img src={transistemasLogo} alt='logo' />
                </Link>
                <button type='button' className='navbar__menu-button' onClick={() => toggleMenu()}>
                    <div className='navbar__menu-icon'></div>
                </button>
            </div>

            <ul ref={links} className='navbar__links' >
                <NavbarLinks onClick={() => toggleMenu()} />
            </ul>
        </nav >
    );
}

export default Navbar;