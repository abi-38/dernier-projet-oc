import React from 'react';
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    Link
} from "react-router-dom";

export default function Nav () {
    return (
        <>
        <MDBDropdownToggle tag='a' >
            <i class="fas fa-bars"></i>
        </MDBDropdownToggle>
        <MDBDropdownMenu>
            <MDBDropdownItem>
                <MDBDropdownLink><Link to="/">Se connecter</Link></MDBDropdownLink>
            </MDBDropdownItem>
            <MDBDropdownItem>
                <MDBDropdownLink><Link to="/sinscrire">S'inscrire</Link></MDBDropdownLink>
            </MDBDropdownItem>
        </MDBDropdownMenu>
        </>
    );
}
