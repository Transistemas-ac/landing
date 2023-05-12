import { createContext, useState } from 'react';

export const DisplayContext = createContext();

export function useDisplay() {
    const mql = window.matchMedia("(min-width: 1120px)");

    const [display, setDisplay] = useState(mql.matches)

    mql.onchange = ({ matches }) => {
        console.log(matches)
        setDisplay(matches)
    };

    return display
}
