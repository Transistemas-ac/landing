import { useEffect } from 'react';

import logo from '../media/svg/logo_transistemas.svg';

import Button from '../components/Button';

function Topbar() {

    useEffect(() => {
        document.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight } = document.documentElement;
            const scrollPercent = scrollTop / (scrollHeight - window.innerHeight) * 100 + '%';
            document.querySelector('.progress-bar').style.width = scrollPercent
        });
    })

    function toggleMenu(e){
        document.body.classList.toggle("menu-open")
        document.querySelector(".topbar-container").classList.toggle("menu-open")
    }

    return (
        <div className="topbar-container">
            <div className="progress-bar-container">
                <div className="progress-bar"></div>
            </div>

            <div className="topbar">
                <img src={logo} alt="logo" />
                <div className="topbar__menu-button" onClick={(e)=>{toggleMenu(e)}}>
                    <div className='topbar__menu-icon'></div>
                </div>
            </div>

            <nav className="menu">
                <ul className="menu__links-container">
                    <li className="menu__link">Inicio</li>
                    <li className="menu__link">Cursos y talleres</li>
                    <li className="menu__link">Nosotres</li>
                    <li className="menu__link">En los medios</li>
                    <li className="menu__link">Leyes</li>
                    <Button>Donar</Button>
                </ul>
            </nav>
        </div>
    );
}

export default Topbar;