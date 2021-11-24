import React from 'react';
import { MDBDropdown } from 'mdb-react-ui-kit';
import MenuLogin from '../../../assets/Listes/MenuLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Nav from './nav';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { AuthContextPorvider } from '../../../hooks/Auth-context';

/*<GuardProvider guards={[requireLogin]} loading={Loading} error={NotFound}>...</GuardProvider>
<GuardedRoute path="/" exact component={Home} meta={{ auth: true }} />
*/

export default function DropDownList () {
  return (
  <AuthContextPorvider>
      <Router>
          <MDBDropdown>
            <Nav/>
            
            <Switch>
                {MenuLogin.map((route, index) => 
                <Route key={index} path={route.path} exact={route.exact ?? false} meta={{ auth: true }}>
                  {route.component}
                </Route>)}
            </Switch>
          </MDBDropdown>
      </Router>
    </AuthContextPorvider>
  );
}