import React from 'react';
import './Card.scss';

const Card = (props) => {
    return(
        <div className="Card">
            {props.children}
        </div>
    )
}

export default Card;