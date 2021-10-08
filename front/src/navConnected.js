import React from 'react';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    Link
} from "react-router-dom";

export default function NavConnected () {
    return (
        <>
        <MDBDropdownToggle tag='a'>
            <FontAwesomeIcon icon={faBars} />
        </MDBDropdownToggle>
        <MDBDropdownMenu>
            <MDBDropdownItem>
                <MDBDropdownLink><Link to="/">Home</Link></MDBDropdownLink>
            </MDBDropdownItem>
        </MDBDropdownMenu>
        </>
    );
}
