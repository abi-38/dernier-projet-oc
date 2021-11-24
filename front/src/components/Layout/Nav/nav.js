import React from 'react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {Link} from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../../../hooks/Auth-context';
//import { AuthContextPorvider } from '../../../hooks/Auth-context';

const Nav = () => {  
    const ctx = useContext(AuthContext);

    return (
        <>
            <MDBDropdownToggle tag='a'>
                <FontAwesomeIcon icon={faBars} />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {!ctx.isLogin() && 
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/">Se connecter</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {!ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/sinscrire">S'inscrire</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/home">Home</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/account">Mon compte</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink><button onClick={ctx.onLogout}>Se déconnecter</button></MDBDropdownLink>
                </MDBDropdownItem>}
            </MDBDropdownMenu>
        </>
    );
}

export default Nav;
/**
 <Context.Provider value={isConnected}>
 </Context.Provider>
 */