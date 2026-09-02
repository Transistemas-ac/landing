import socialLinks from "../data/SocialLinks";

const footerLinks = [
  { href: "/about", label: "Nosotres" },
  { href: "/contact", label: "Contacto" },
  { href: "/privacy", label: "Privacidad" }
];

function Footer() {
  return (
    <footer className="footer">
      <nav className="footer-links" aria-label="Información">
        {footerLinks.map(({ href, label }) => (
          <a key={href} className="footer-link" href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="footer-icon-container">
        {socialLinks.map(({ href, icon, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
          >
            <img className="footer-icon" src={icon} alt="" />
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
