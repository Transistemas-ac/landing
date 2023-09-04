import { useState } from "react";

function useDisplay() {
    const mql = window.matchMedia("(max-width: 980px)");

    const [isMobile, setIsMobile] = useState(mql.matches)

    mql.onchange = ({ matches }) => {
        setIsMobile(matches)
    };

    return isMobile
}

export default useDisplay;