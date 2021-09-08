import React from 'react';
import Button from '../../Reusable/Button';
import '../Identification/Identification.scss';
import '../../Listes/sinscrireList';
import '../../Listes/seConnecterList';
import Input from '../../Reusable/Input';
import sinscrireList from '../../Listes/sinscrireList';
import '../../Reusable/Input.scss';

function CreerCommpte (props) {
  const List = (props);
    return (
      <>
        <div className="Identification">
          <h1 className='h1Test' >Créer un compte</h1>
          
          <form>
            {sinscrireList.map(champ => {
                return <li key={champ.id} className="Input">
                <Input champ={champ} />
                </li>
              })
            }
          </form>
          <Button text={'Se connecter'} />
        </div>
        <p className='Information'>Vous avez déjà un compte ? <a href='#'>Identifiez-vous !</a></p>
      </>
    );
}

/* 
{List && <FormSinscrire/> }
{List.map(champ => { */

export default CreerCommpte;