import { NavLink } from 'react-router-dom';


function Button(props) {
    return (
        <NavLink to={props.href}>
            <div className="button">
                <p className="button__text">{props.children}</p>
            </div>
        </NavLink>
    );
}

export default Button;



