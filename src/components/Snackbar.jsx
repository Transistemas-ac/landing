import { createRoot } from 'react-dom/client';
import iconClose from '../assets/svg/icon_close.svg'

const SnackbarContainer = () => <div id='snackbar-container'></div>

const Snackbar = ({ message, type, root }) => {
    return (
        <div className={`snack ${type}`}>
            <p className='snack__message'>{message}</p>
            <img className='snack__close' src={iconClose} alt="icono de cerrar snackbar"
                onClick={() => root.unmount()} />
        </div >
    )
}

let lastSnack;

function snackbar(message, type, duration) {
    const container = document.getElementById('snackbar-container');
    if (lastSnack) lastSnack.unmount();

    const snack = document.createElement('div');
    snack.className = 'snackbar-container__snack';
    snack.root = createRoot(snack);
    snack.dissapear = setTimeout(() => { snack.unmount() }, duration)
    snack.unmount = function (timeout) {
        lastSnack = null
        this.firstChild.classList.add('dissapear')
        clearTimeout(this.dissapear)
        setTimeout(() => {
            this.root.unmount()
            container.removeChild(this)
        }, 350)
    }
    lastSnack = snack;

    container.appendChild(snack);
    snack.root.render(<Snackbar message={message} type={type} duration={duration} root={snack} />)
}

export { SnackbarContainer, snackbar };