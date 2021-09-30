import React from 'react';
import '../Identification/Identification.scss';
import '../../Listes/sinscrireList';
import '../../Listes/seConnecterList';
import '../../Reusable/Input.scss';
import {
  Link
} from "react-router-dom";
import Login from './Login';

function Identification(props) {
  const List = (props);
    return (
      <>
        <div className="Identification">
          <h1 className='h1' >Identifiez-vous</h1>
          <Login />
        </div>
        <p className='Information'>Vous n'avez pas de compte ? <Link to="/sinscrire">Inscrivez-vous !</Link></p>
      </>
    );
}

export default Identification;