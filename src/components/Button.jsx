import { snackbar } from './Snackbar';

import iconSend from '../assets/svg/icon_send.svg'
import iconMail from '../assets/svg/icon_mail.svg'
import iconCopy from '../assets/svg/icon_copy.svg'
import iconLink from '../assets/svg/icon_arrow.svg';

function Button(props) {
    let { icon } = props;
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
                icon = { href: iconLink, alt: 'Icono de link externol' }
                break;
            case 'copy':
                icon = { href: iconCopy, alt: 'Icono de copiar texto' }
                break;
            default:
                break;
        }

        Icon = () => {
            return (<img className='button__icon' src={icon.href} alt={icon.alt} />)
        }
    }

    function copyText(e) {
        if (props.copy) {
            e.preventDefault();
            e.stopPropagation();
            navigator.clipboard.writeText(props.copy)
                .then(() => {
                    snackbar('Texto copiado exitosamente', 'success', 3000)
                })
                .catch((error) => {
                    snackbar('Ha ocurrido un error inesperado', 'error', 3000)
                });
        }
    }

    return (
        <>
            {props.type === 'link'
                ?
                <a {...props} type="text/html" className={`${props.className || ''} button ${icon ? 'button--icon' : ''}`} onClick={(e) => copyText(e)}>
                    {props.children}
                    < Icon />
                </a>
                :
                <button {...props} className={`${props.className || ''} button ${icon ? 'button--icon' : ''}`} onClick={(e) => copyText(e)}>
                    {props.children}
                    < Icon />
                </button>
            }
        </>
    );
}

export default Button;



