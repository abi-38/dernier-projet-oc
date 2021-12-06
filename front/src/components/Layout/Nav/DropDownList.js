import { MDBDropdown } from 'mdb-react-ui-kit';
import MenuLogin from '../../../assets/Listes/MenuLogin';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Nav from './nav'
import { AuthContextPorvider } from '../../../context/Auth-context';

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