import iconFacebookOutline from '../media/svg/media_facebook_outline.svg';
import iconInstagramOutline from '../media/svg/media_instagram_outline.svg';
import iconTwitterOutline from '../media/svg/media_twiter_outline.svg';
import iconTikTokOutline from '../media/svg/media_tiktok_outline.svg';
import iconLinkedinOutline from '../media/svg/media_linkedin_outline.svg';
import iconTelegramOutline from '../media/svg/media_telegram_outline.svg';


function Footer(props) {
    return (
        
            <div className="footer">
                <h1 className="footer__title">Nuestras redes</h1>
            
                <div className="footer__icon-container">
                    <img className= "footer__icon" src={iconFacebookOutline} alt="icono de facebook" />
                    <img className= "footer__icon" src={iconInstagramOutline} alt="icono de instagram" />
                    <img className= "footer__icon" src={iconTwitterOutline} alt="icono de instagram" />
                    <img className= "footer__icon" src={iconTikTokOutline} alt="icono de instagram" />
                    <img className= "footer__icon" src={iconLinkedinOutline} alt="icono de instagram" />
                    <img className= "footer__icon" src={iconTelegramOutline} alt="icono de instagram" />
                </div>
            
            </div>
    );
}

export default Footer;
