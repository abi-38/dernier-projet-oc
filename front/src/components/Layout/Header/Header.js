import React from 'react';
import logo from '../../../assets/img/Logo.png'
import './Header.scss';
import DropDownList from '../Nav/DropDownList';
import '../Nav/DropDownList.scss';
import DropDownListConnected from '../../../DropDownListConected';
//import React, {useEffect} from "react";
//import { useHistory, Redirect } from "react-router-dom";

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className='App-header__Logo' alt='logo' />
            <DropDownList/>
        </header>
    )
}

export default Header;