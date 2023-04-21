import { Link } from 'react-router-dom';


function Button(props) {
    return (
        <Link to={props.href}>
            <div className="button">
                <p className="button__text">{props.children}</p>
            </div>
        </Link>
    );
}

export default Button;



