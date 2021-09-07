import React from 'react';
import logo from '../../Logo.png';
import Burger from '../Burger/Burger';
import '../Header/Header.scss';

function Header() {
    return (
    <header className="App-header">
        <img src={logo} className='App-header__Logo' alt='logo' />
        <Burger/>
    </header>
    )
}

export default Header;