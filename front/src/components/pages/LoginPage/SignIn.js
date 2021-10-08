import React from 'react';
import './Sign.scss';
import {
  Link
} from "react-router-dom";
import Login from './Login/Login';
import '../../Layout/Header/Header.scss';

function SignIn() {
  return (
    <div className="Sinscire">
      <div className="Identification">
          <h1 className='h1'>Identifiez-vous</h1>
          <Login />
        </div>
        <p className='Information'>Vous n'avez pas de compte ? <Link to="/sinscrire">Inscrivez-vous !</Link></p>
    </div>
  );
}
  
export default SignIn;