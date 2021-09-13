import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import SeConnecter from './Sinscrire/SeConnecter';
import Sinscrire from './Sinscrire/Sinscrire';
import './DropDownList.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function DropDownList () {
  return (
    <Router>
        <MDBDropdown>
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
            <Switch>
                <Route path="/sinscrire">
                <Sinscrire />
                </Route>
                <Route path="/">
                <SeConnecter />
                </Route>
            </Switch>
        </MDBDropdown>
    </Router>
  );
}