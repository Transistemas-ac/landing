import iconArrowUp from '../media/svg/icon_arrow_down.svg';

function Team(props) {
    return (
        <div className="team">
            <p className="team__title">{props.title}</p>

            <img className="team__icon" src={iconArrowUp} alt="icono de flecha" />
        </div>
    );
}

export default Team;



