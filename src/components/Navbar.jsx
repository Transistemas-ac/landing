import { useCallback, useContext, useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { NavbarLinks } from "../routes";
import DisplayContext from "../context/DisplayProvider";
import transistemasLogo from "../assets/svg/logo_transistemas.svg";

function Navbar() {
  const isMobile = useContext(DisplayContext);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState("0%");

  const updateProgressBar = useCallback(() => {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollableHeight = scrollHeight - window.innerHeight;

    if (scrollableHeight <= 0) {
      setProgress("0%");
      return;
    }

    const scrollPercent = Math.min((scrollTop / scrollableHeight) * 100, 100);
    setProgress(`${scrollPercent}%`);
  }, []);

  useEffect(() => {
    updateProgressBar();
    window.addEventListener("scroll", updateProgressBar, { passive: true });
    window.addEventListener("resize", updateProgressBar);

    return () => {
      window.removeEventListener("scroll", updateProgressBar);
      window.removeEventListener("resize", updateProgressBar);
    };
  }, [updateProgressBar]);

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && expanded) {
      document.body.classList.add("navbar--expanded");
    } else {
      document.body.classList.remove("navbar--expanded");
    }

    return () => {
      document.body.classList.remove("navbar--expanded");
    };
  }, [isMobile, expanded]);

  const toggleMenu = () => isMobile && setExpanded((prevState) => !prevState);
  const closeMenu = () => setExpanded(false);

  return (
    <nav className={`navbar ${expanded ? "navbar--expanded" : ""}`}>
      <div
        style={{ width: `${progress}` }}
        className="navbar__progress-bar"
      ></div>

      <div className="navbar__inner-container">
        <HashLink to={"/"} className="navbar__logo" onClick={closeMenu}>
          <img src={transistemasLogo} alt="logo" />
        </HashLink>
        <button type="button" className="navbar__menu-button" onClick={toggleMenu}>
          <div className="navbar__menu-icon"></div>
        </button>
        {!isMobile ? (
          <ul className="navbar__links">
            <NavbarLinks onClick={closeMenu} />
          </ul>
        ) : null}
      </div>

      {isMobile ? (
        <ul className="navbar__links">
          <NavbarLinks onClick={closeMenu} />
        </ul>
      ) : null}
    </nav>
  );
}

export default Navbar;
