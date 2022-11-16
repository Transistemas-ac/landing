//import cardImage from '../media/svg/carousel-image-0.svg'; // gives image path

//<img className="card__image" src={cardImage} />

function Contact(props) {
    return (
        <div className="contact">
            <p className="contact_title">{props.title}</p>
        </div>
    );
}

export default Contact;



