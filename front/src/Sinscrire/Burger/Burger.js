import React from 'react';
import Menu from '../Menu/Menu';
import {useState} from 'react';
import '../Burger/Burger.scss';

function Burger() {
  const [isShow, setIsShow] = useState( {initialState: false} );
  
  const handleToggleButton = () => {
    setIsShow(!isShow);
  }
  return (
    <>
    <button onClick={handleToggleButton}>
    <i class="fas fa-bars"></i>
    </button>
    {!isShow && <Menu/>}
    </>
  )
}

export default Burger;
                