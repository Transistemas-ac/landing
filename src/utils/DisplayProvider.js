import { createContext, useState } from 'react';

export const DisplayContext = createContext();

export function useDisplay() {
    const mql = window.matchMedia("(min-width: 1120px)");

    const [display, setDisplay] = useState(mql.matches ? 'desktop' : 'mobile')

    mql.onchange = ({ matches }) => {
        setDisplay(matches ? 'desktop' : 'mobile')
    };

    return display
}
