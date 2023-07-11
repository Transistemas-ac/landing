import { createContext, useState } from 'react';

export const DisplayContext = createContext();

export function useDisplay() {
    const mql = window.matchMedia("(max-width: 980px)");

    const [isMobile, setIsMobile] = useState(mql.matches)

    mql.onchange = ({ matches }) => {
        setIsMobile(matches)
    };

    return isMobile
}
