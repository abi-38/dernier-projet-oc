import React from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { GuardProvider, GuardedRoute } from 'react-router-guards';

/* Composants à créer : 
- getIsLoggedIn,
- Loading,
- Login,
- Home,
- MonProfil, 
- Lequipe,
- NotFound*/

/* const requireLogin = (to, from, next) => {
    if (to.meta.auth) {
      if (getIsLoggedIn()) {
        next();
      }
      next.redirect('/login');
    } else {
      next();
    }
};*/

/*export default function MenuApp () {
  return (
    <Router>
        <MDBDropdown>
            <MDBDropdownToggle tag='a' >
            <i class="fas fa-bars"></i>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem>
                <MDBDropdownLink><Link to="/">Home</Link></MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                <MDBDropdownLink><Link to="/Lequipe">L'équipe</Link></MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                <MDBDropdownLink><Link to="/MonProfil">Mon profil</Link></MDBDropdownLink>
                </MDBDropdownItem>
            </MDBDropdownMenu>
            <GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>
                  <Switch>
                      <GuardedRoute path="/login" exact component={Login} />
                      <GuardedRoute path="/" exact component={Home} meta={{ auth: true }} />
                      <GuardedRoute path="/MonProfil" exact component={MonProfil} meta={{ auth: true }} />
                      <GuardedRoute path="/Lequipe" exact component={Lequipe} meta={{ auth: true }} />
                      <GuardedRoute path="/*" exact component={NotFound} />
                  </Switch>
              </GuardProvider>
        </MDBDropdown>
    </Router>
  );
}
*/
