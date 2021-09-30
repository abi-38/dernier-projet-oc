import React from 'react';
import { MDBDropdown } from 'mdb-react-ui-kit';
import MenuConnected from './Listes/MenuConnected';
import './DropDownList.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NavConnected from './navConnected';
import { GuardProvider, GuardedRoute } from 'react-router-guards';

//import { getIsLoggedIn } from 'utils'; -> composant à créer ?


/*const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getIsLoggedIn()) {
      next();
    }
    next.redirect('/sinscrire');
  } else {
    next();
  }
};*/

/*<GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>...</GuardProvider>
<GuardedRoute path="/" exact component={Home} meta={{ auth: true }} />
*/

export default function DropDownListConnected () {
  return (
    <Router>
        <MDBDropdown>
            <NavConnected/>
            
            <Switch>
                {MenuConnected.map((route, index) => <Route key={index} path={route.path} exact={route.exact ?? false} meta={{ auth: true }}>{route.component}</Route>)}
            </Switch>
            
        </MDBDropdown>
    </Router>
  );
}