import React from 'react';
import logo from '../Logo.png';
import './Header.scss';
import DropDownList from '../DropDownList';
import DropDownListConnected from '../DropDownListConected';
//import React, {useEffect} from "react";
//import { useHistory, Redirect } from "react-router-dom";

function Header() {
    return (
        <header className="App-header">
            <img src={logo} className='App-header__Logo' alt='logo' />
            <DropDownListConnected/>
        </header>
    )
}

/*
const history = useHistory();
if (!localStorage.getItem( {key: 'token'} )) { // ET Vérifier que le token est valide
    return <DropDownList/>
}
return (
    <DropDownListConnected/>
)èç
*/

export default Header;

/*
si pas connecter -> afficher DropDownList
si connecter -> afficher une autre DropDownListConnected avec menu 2
*/