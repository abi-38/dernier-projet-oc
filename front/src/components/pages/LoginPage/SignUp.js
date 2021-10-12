import React from 'react';
import './Sign.scss';
import Button from '../../UI/Button';
import '../../UI/Button.scss';
import Input from '../../UI/Input';
import '../../UI/Input.scss';
import SignUpList from '../../../assets/Listes/SignUpList';
import '../../Layout/Header/Header.scss';
import {
  Link
} from "react-router-dom";

function SignUp() {
  return (
    <div className="Sinscire">
      <div className="Identification Identification__Compte">
        <h1 className='h1' >Créer un compte</h1>
        <form>
          {SignUpList.map(champ => {
              return <li key={champ.id} className="Input">
              <Input champ={champ} />
              </li>
            })
          }
        <Button className='Bouton-link__Connection' type='button' text='Se connecter' />
        </form>
      </div>
      <p className='Information'>Vous avez déjà un compte ? <Link to="/">Identifiez-vous !</Link></p>
    </div>
  );
}
  
export default SignUp;