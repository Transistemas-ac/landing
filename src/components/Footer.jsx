import socialLinks from "../data/SocialLinks";

function Footer() {
  return (
    <footer className="footer">
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
