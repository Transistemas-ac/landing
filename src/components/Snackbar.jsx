import { useState, useEffect } from 'react';

const Snackbar = ({ message, type, active }) => (
    <div className={`snackbar ${active ? 'show' : ''} ${type}`}>
        <span>{message}</span>
    </div>
)

function useSnackbar(message, type, duration) {
    const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setVisible(false);
    //     }, duration);

    //     return () => clearTimeout(timer);
    // }, [duration]);

    return (
        <>
            {ReactDOM.createPortal(<Snackbar message={message} type={type} active={visible} />, document.body)}
        </>
    );
}

export { Snackbar, useSnackbar };    