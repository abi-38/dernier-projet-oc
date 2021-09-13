import React from 'react';

const Input = (props) => {
  const {champ} = props;
    return (
      <label>
          {champ.label}
          <input type={champ.type} name={champ.name} />
      </label>
    );
}

export default Input;