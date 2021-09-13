import React from 'react';
import logo from '../Logo.png';
import './Header.scss';
import DropDownList from '../DropDownList';

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className='App-header__Logo' alt='logo' />
            <DropDownList/>
        </header>
)}

export default Header;