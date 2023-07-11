import { Link } from 'react-router-dom';
import { snackbar } from './Snackbar';

import iconSend from '../assets/svg/icon_send.svg'
import iconMail from '../assets/svg/icon_mail.svg'
import iconCopy from '../assets/svg/icon_copy.svg'
import iconLink from '../assets/svg/icon_arrow.svg';

function Button(props) {
    let { type, icon, copy, href, className, children, onClick, ...otherProps } = props;
    let Icon = () => <></>;
    let Element = () => <></>;

    if (icon) {
        switch (icon) {
            case 'send':
                icon = { href: iconSend, alt: 'Icono de enviar' }
                break;
            case 'mail':
                icon = { href: iconMail, alt: 'Icono de mail' }
                break;
            case 'link':
                icon = { href: iconLink, alt: 'Icono de link externo' }
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

    switch (type) {
        case 'link':
            Element = () => {
                return (
                    <Link {...otherProps} to={href} className={`${className || ''} button ${icon ? 'button--icon' : ''}`}>
                        {children}
                        < Icon />
                    </Link>
                )
            }
            break;
        case 'anchor':
            Element = () => {
                return (
                    <a {...otherProps} href={href} type="text/html" className={`${className || ''} button ${icon ? 'button--icon' : ''}`}>
                        {children}
                        < Icon />
                    </a>
                )
            }
            break;
        default:
            Element = () => {
                return (
                    <button {...otherProps} type={type} className={`${className || ''} button ${icon ? 'button--icon' : ''}`} onClick={copy ? (e) => copyText(e) : props.onClick} >
                        {children}
                        < Icon />
                    </button >
                )
            }
            break;
    }

    function copyText(e) {
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

    return (
        <>
            <Element />
            {/* {props.type === 'link'
                ?
                <a {...otherProps} type="text/html" className={`${className || ''} button ${icon ? 'button--icon' : ''}`}>
                    {children}
                    < Icon />
                </a>
                :
                <button {...otherProps} className={`${className || ''} button ${icon ? 'button--icon' : ''}`} onClick={copy ? (e) => copyText(e) : props.onClick} >
                    {children}
                    < Icon />
                </button >
            } */}
        </>
    );
}

export default Button;



