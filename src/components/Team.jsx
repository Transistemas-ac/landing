

function Team(props) {
    return (
        <div className="team">
            <h2 className="team__title">{props.title}</h2>

            <a className="team__link" href="./ArrowDown.jsx">{props.link}</a>
        </div>
    );
}

export default Team;



