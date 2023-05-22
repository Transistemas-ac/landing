import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import iconClose from '../assets/svg/icon_close.svg'

const SnackbarContainer = () => <div id='snackbar-container'></div>

const Snackbar = ({ message, type, duration }) => {
    const [active, setActive] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setActive(false);
        }, duration)
    }, [])

    return (
        <div className={`snack ${active ? 'show' : ''} ${type}`}>
            <p className='snack__message'>{message}</p>
            <img className='snack__close' src={iconClose} alt="icono de cerrar snackbar" onClick={() => setActive(false)} />
        </div >
    )
}


const snacks = [];

function snackbar(message, type, duration) {

    const container = document.getElementById('snackbar-container')

    if (snacks.length >= 1) {
        const lastSnack = snacks[0]
        lastSnack.firstChild.classList.remove('show')
        snacks.pop();
    };

    const snack = document.createElement('div');
    snack.className = 'snackbar-container__snack';
    container.appendChild(snack);
    snack.root = createRoot(snack);

    snacks.push(snack)


    snack.root.render(<Snackbar message={message} type={type} duration={duration} />)

    setTimeout(() => {
        snacks.pop();
        snack.root.unmount();
        container.removeChild(snack);
    }, duration + 1000)
}

export { SnackbarContainer, Snackbar, snackbar };    