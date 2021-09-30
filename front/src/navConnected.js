import React from 'react';
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    Link
} from "react-router-dom";

export default function NavConnected () {
    return (
        <>
        <MDBDropdownToggle tag='a' >
            <i class="fas fa-bars"></i>
        </MDBDropdownToggle>
        <MDBDropdownMenu>
            <MDBDropdownItem>
                <MDBDropdownLink><Link to="/">Home</Link></MDBDropdownLink>
            </MDBDropdownItem>
        </MDBDropdownMenu>
        </>
    );
}
