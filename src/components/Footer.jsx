import iconFacebookOutline from "../assets/svg/media_facebook_outline.svg";
import iconInstagramOutline from "../assets/svg/media_instagram_outline.svg";
import iconTwitterOutline from "../assets/svg/media_twiter_outline.svg";
import iconTikTokOutline from "../assets/svg/media_tiktok_outline.svg";
import iconLinkedinOutline from "../assets/svg/media_linkedin_outline.svg";
import iconDiscordOutline from "../assets/svg/media_discord_outline.svg";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/transistemas/",
    icon: iconInstagramOutline,
    label: "Visitar Instagram de Transistemas"
  },
  {
    href: "https://www.facebook.com/Transistemas",
    icon: iconFacebookOutline,
    label: "Visitar Facebook de Transistemas"
  },
  {
    href: "https://x.com/Transistemas1",
    icon: iconTwitterOutline,
    label: "Visitar X (Twitter) de Transistemas"
  },
  {
    href: "https://www.tiktok.com/@transistemas",
    icon: iconTikTokOutline,
    label: "Visitar TikTok de Transistemas"
  },
  {
    href: "https://www.linkedin.com/company/transistemasok/",
    icon: iconLinkedinOutline,
    label: "Visitar LinkedIn de Transistemas"
  },
  {
    href: "https://discord.gg/FSAbrjsCbW",
    icon: iconDiscordOutline,
    label: "Unirse al Discord de Transistemas"
  }
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-icon-container">
        {SOCIAL_LINKS.map(({ href, icon, label }) => (
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
