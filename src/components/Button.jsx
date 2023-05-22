import { useEffect, useRef } from 'react';

import { snackbar } from './Snackbar';

import iconSend from '../assets/svg/icon_send.svg'
import iconMail from '../assets/svg/icon_mail.svg'
import iconCopy from '../assets/svg/icon_copy.svg'
import iconArrow from '../assets/svg/icon_arrow.svg';

function Button({ className, href, children, icon, copy }) {

    const button = useRef()
    let Icon = () => <></>

    if (icon) {
        switch (icon) {
            case 'send':
                icon = { href: iconSend, alt: 'Icono de enviar' }
                break;
            case 'mail':
                icon = { href: iconMail, alt: 'Icono de mail' }
                break;
            case 'link':
                icon = { href: iconArrow, alt: 'Icono de link externol' }
                break;
            case 'copy':
                icon = { href: iconCopy, alt: 'Icono de copiar texto', copy: true }
                break;
            default:
                break;
        }

        Icon = () => {
            if (icon.copy) {
            }
            return (<img className='button__icon' src={icon.href} alt={icon.alt} />)
        }
    }

    function copyText(e) {
        if (icon?.copy) {
            e.preventDefault();
            e.stopPropagation();
            // console.log(e.target)
            navigator.clipboard.writeText(copy)
                .then(() => {
                    snackbar('Texto copiado exitosamente', 'success', 5000)
                })
                .catch((error) => {
                    snackbar('Ha ocurrido un error inesperado', 'error', 5000)
                });
        }
    }

    useEffect(() => {
        // if (icon?.copy) {
        //     button.current.addEventListener('click', (e) => {
        //         e.preventDefault();
        //         e.stopPropagation();
        //         console.log(e.target)
        //         navigator.clipboard.writeText(copy)
        //             .then(() => {
        //                 // const container = document.createElement('div');
        //                 // document.body.appendChild(container)
        //                 // const root = createRoot(container);
        //                 // root.render(<Snackbar message='Exito' duration={8000} />)

        //                 // const container = document.getElementById('root');
        //                 // ReactDOM.createPortal(<Snackbar message='Exito' duration={8000} />, container);

        //                 snackbar('Exito', 'x', 8000)
        //             })
        //             .catch((error) => {
        //                 console.error('Failed to copy text:', error);
        //             });
        //     })
        // }
    }, [])



    return (
        // <div className={`${className} button`}>
        //     <p className="button__text">
        //         <a href={href}>
        //             {children}
        //             <Icon />
        //         </a>
        //     </p>
        // </div>
        <a className={`${className} button`} href={href} ref={button} onClick={(e) => copyText(e)}>
            {children}
            <Icon />
            {/* {ReactDOM.createPortal(<Snackbar message='Exito' duration={8000} />, document.body)} */}
        </a>
    );
}

export default Button;



