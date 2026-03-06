import { useEffect, useState } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 980px)";

function useDisplay() {
  const getCurrentDisplay = () => window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  const [isMobile, setIsMobile] = useState(getCurrentDisplay);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export default useDisplay;
