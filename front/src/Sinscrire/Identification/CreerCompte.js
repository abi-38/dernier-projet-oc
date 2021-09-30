import React from 'react';
import Button from '../../Reusable/Button';
import '../Identification/Identification.scss';
import '../../Listes/seConnecterList';
import Input from '../../Reusable/Input';
import sinscrireList from '../../Listes/sinscrireList';
import '../../Reusable/Input.scss';
import {
  Link
} from "react-router-dom";

function CreerCommpte (props) {
  const List = (props);
  return (
    <>
      <div className="Identification Identification__Compte">
        <h1 className='h1' >Créer un compte</h1>
        <form>
          {sinscrireList.map(champ => {
              return <li key={champ.id} className="Input">
              <Input champ={champ} />
              </li>
            })
          }
        <Button className='Bouton-link__Connection' type='button' text='Se connecter' />
        </form>
      </div>
      <p className='Information'>Vous avez déjà un compte ? <Link to="/">Identifiez-vous !</Link></p>
    </>
  );
}

export default CreerCommpte;