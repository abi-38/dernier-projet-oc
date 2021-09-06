import React from 'react';
import logo from '../Logo.png';
import Identification from './Identification/Identification';
import '../scss/_variables.scss';
import '../App.scss';
import {useState} from 'react';
import Menu from './Menu/Menu';

function Sinscrire() {
  const [isShow, setIsShow] = useState( {initialState: false} );

  const handleToggleButton = (event) => {
    setIsShow(!isShow);
  }
  return (
    <div className="Sinscire">
      <header className="App-header">
        <img src={logo} className='App-header__Logo' alt='logo' />
        <button onClick={handleToggleButton}>
          <i class="fas fa-bars"></i>
        </button>
        {!isShow && <Menu/>}
      </header>
      <Identification/>
    </div>
  );
}
  
export default Sinscrire;