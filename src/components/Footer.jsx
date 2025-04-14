import iconFacebookOutline from "../assets/svg/media_facebook_outline.svg";
import iconInstagramOutline from "../assets/svg/media_instagram_outline.svg";
import iconTwitterOutline from "../assets/svg/media_twiter_outline.svg";
import iconTikTokOutline from "../assets/svg/media_tiktok_outline.svg";
import iconLinkedinOutline from "../assets/svg/media_linkedin_outline.svg";
import iconTelegramOutline from "../assets/svg/media_telegram_outline.svg";

function Footer() {
  return (
    <div className="footer">
      <h1 className="footer__title">Nuestras redes</h1>

      <div className="footer__icon-container">
        <a
          href="https://www.facebook.com/Transistemas"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconFacebookOutline}
            alt="icono de facebook"
          />
        </a>

        <a
          href="https://www.instagram.com/transistemas/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconInstagramOutline}
            alt="icono de instagram"
          />
        </a>

        <a href="https://x.com/Transistemas1" target="_blank" rel="noreferrer">
          <img
            className="footer__icon"
            src={iconTwitterOutline}
            alt="icono de instagram"
          />
        </a>

        <a
          href="https://www.tiktok.com/@transistemas?lang=es"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconTikTokOutline}
            alt="icono de instagram"
          />
        </a>

        <a
          href="https://www.linkedin.com/company/transistemasok/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconLinkedinOutline}
            alt="icono de instagram"
          />
        </a>

        <a href="https://t.me/Transistemas" target="_blank" rel="noreferrer">
          <img
            className="footer__icon"
            src={iconTelegramOutline}
            alt="icono de instagram"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
