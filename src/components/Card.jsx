import { Children } from "react";

function Card({ className, children, divider = false }) {

    const arrayChildren = Children.toArray(children);


    return (
        <div className={`${className} card ${divider ? 'card--divided' : ''}`}>
            {
                divider
                    ?
                    Children.map(arrayChildren, (child, idx) =>
                        <>{child} <hr /></>)
                        // idx !== arrayChildren.length - 1 ? <>{child} <hr /></> : <>{child}</>)
                    :
                    children
            }

            {/* <hr /> */}
        </div>
    )
}

export default Card;    