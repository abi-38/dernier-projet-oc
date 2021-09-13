import React from 'react';
import {useState} from 'react';
import '../Burger/Burger.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SeConnecter from '../SeConnecter';
import Sinscrire from '../Sinscrire';

function Burger() {
  const [isShow, setIsShow] = useState( {initialState: true} );
  
  const handleToggleButton = () => {
    setIsShow(prevState => !prevState);
  }
  return (
    <>
    <button onClick={handleToggleButton}>
    <i class="fas fa-bars"></i>
    {!isShow && <Router>
      <div className="Menu">
      <h2 className='h1Test__h2'>Menu</h2>
        <nav>
          <ul>
            <li>
              <Link to="/">Se connecter</Link>
            </li>
            <li>
              <Link to="/sinscrire">S'inscrire</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
          <Route path="/sinscrire">
            <Sinscrire />
          </Route>
          <Route path="/">
            <SeConnecter />
          </Route>
        </Switch>
    </Router>}
    </button>
    
    </>
  )
}
/*{!isShow && <Menu/>} */

export default Burger;
                