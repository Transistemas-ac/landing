import iconFacebookOutline from "../assets/svg/media_facebook_outline.svg";
import iconInstagramOutline from "../assets/svg/media_instagram_outline.svg";
import iconTwitterOutline from "../assets/svg/media_twiter_outline.svg";
import iconTikTokOutline from "../assets/svg/media_tiktok_outline.svg";
import iconLinkedinOutline from "../assets/svg/media_linkedin_outline.svg";
import iconDiscordOutline from "../assets/svg/media_discord_outline.svg";

function Footer() {
  return (
    <div className="footer">
      <h1 className="footer__title">Nuestras redes</h1>

      <div className="footer__icon-container">
        <a
          href="https://www.instagram.com/transistemas/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconInstagramOutline}
            alt="Ícono de Instagram"
          />
        </a>
        <a
          href="https://www.facebook.com/Transistemas"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconFacebookOutline}
            alt="Ícono de Facebook"
          />
        </a>

        <a href="https://x.com/Transistemas1" target="_blank" rel="noreferrer">
          <img
            className="footer__icon"
            src={iconTwitterOutline}
            alt="Ícono de Twitter"
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
            alt="Ícono de TikTok"
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
            alt="Ícono de LinkedIn"
          />
        </a>

        <a
          href="https://discord.gg/yuYpD6QW74"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="footer__icon"
            src={iconDiscordOutline}
            alt="Ícono de Discord"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
