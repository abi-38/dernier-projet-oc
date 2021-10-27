import React from 'react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    Link
} from "react-router-dom";
// isConnected est à améliorer !!
const isConnected = localStorage.getItem( 'token' );// ET Vérifier que le token est valide
// utiliser le useState:token et useEffect:changement dans localStorage -> hook

export default function Nav () {    
    return (
        <>
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
                <MDBDropdownLink><Link to="/">Home</Link></MDBDropdownLink>
            </MDBDropdownItem>}
        </MDBDropdownMenu>
        </>
    );
}
