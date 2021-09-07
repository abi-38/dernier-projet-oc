import React from 'react';
import './Input.scss';

const Input = (props) => {
    return (
      <div className="Input">
        <label>
            {props.label}
            <input type="text" name="label" />
        </label>
      </div>
    );
}

export default Input;