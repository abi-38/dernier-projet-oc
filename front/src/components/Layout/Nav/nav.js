import React from 'react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    Link
} from "react-router-dom";
import {useState} from 'react';
import {useEffect} from 'react';
import {createContext } from 'react';

// mettre en place useContext + améliorer isConnected...
const isConnected = localStorage.getItem( 'token' );
const Context = createContext(isConnected);

const Nav = () => {  
    const value = isConnected;
    //const [tokenValue, setTokenValue] = useState(false);
    //const [error, setError] = useState(null);
    // context, cf. vidéo
    // isConnected est à améliorer !!
    // utiliser le useState:token et useEffect:changement dans localStorage -> hook
    
    /*useEffect(() => {
        const isConnected = () => {
        
        //Vérifier que le token est valide -> comment faire ??
        const tokenData = localStorage.getItem( 'token' );
        const token = tokenData.split(' ')[1];

        if (tokenData === token) {
            setTokenValue(true)
        } else {
            throw 'Token non valide !';
        }
        
        }
        isConnected();
    }, [])*/
    //const isConnected = localStorage.getItem( 'token' );

    return (
        <Context.Provider value={isConnected}>
            <MDBDropdownToggle tag='a'>
                <FontAwesomeIcon icon={faBars} />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {!isConnected && 
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/">Se connecter</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {!isConnected &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/sinscrire">S'inscrire</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {isConnected &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/home">Home</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {isConnected &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/account">Mon compte</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {isConnected &&
                <MDBDropdownItem>
                    <MDBDropdownLink><Link to="/">Se déconnecter</Link></MDBDropdownLink>
                </MDBDropdownItem>}
            </MDBDropdownMenu>
        </Context.Provider>
    );
}

export default Nav;
