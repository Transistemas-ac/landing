import { useEffect, useContext, useState } from 'react';
import { NavbarLinks } from '../routes';
import DisplayContext from '../context/DisplayProvider';

import transistemasLogo from '../assets/svg/logo_transistemas.svg';
import { HashLink } from 'react-router-hash-link';

function Navbar() {

    const isMobile = useContext(DisplayContext);
    const [expanded, setExpanded] = useState(false);
    const [progress, setProgress] = useState('0%');

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

    return (
        <nav className={`navbar ${expanded ? 'navbar--expanded' : ''}`}>

            <div style={{ width: `${progress}` }} className='navbar__progress-bar'></div>

            <div className='navbar__inner-container'>
                <HashLink to={'/'} className='navbar__logo'>
                    <img src={transistemasLogo} alt='logo' />
                </HashLink>
                <button type='button' className='navbar__menu-button' onClick={() => toggleMenu()}>
                    <div className='navbar__menu-icon'></div>
                </button>
                {
                    !isMobile
                        ?
                        <ul className='navbar__links' >
                            <NavbarLinks onClick={() => toggleMenu()} />
                        </ul>
                        :
                        null
                }
            </div>

            {
                isMobile
                    ?
                    <ul className='navbar__links' >
                        <NavbarLinks onClick={() => toggleMenu()} />
                    </ul>
                    :
                    null
            }
        </nav >
    );
}

export default Navbar;