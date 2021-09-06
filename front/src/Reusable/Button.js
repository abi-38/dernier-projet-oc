import React from 'react';

/*Reprendre notation type*/
const Button = (props) => {
    return (
      <button
          type={props.type || 'button'}
          className={`Bouton-link ${props.className}`}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.text}
      </button>
    );
}

export default Button;