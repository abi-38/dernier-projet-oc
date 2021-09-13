import React from 'react';
import Button from '../../Reusable/Button';
import '../Identification/Identification.scss';
import '../../Listes/sinscrireList';
import '../../Listes/seConnecterList';
import Input from '../../Reusable/Input';
import seConnecterList from '../../Listes/seConnecterList';
import '../../Reusable/Input.scss';

function Identification(props) {
  const List = (props);
    return (
      <>
        <div className="Identification">
          <h1 className='h1Test' >Identifiez-vous</h1>
          
          <form>
            {seConnecterList.map(champ => {
                return <li key={champ.id} className="Input">
                <Input champ={champ} />
                </li>
              })
            }
          </form>
          <Button text={'Se connecter'} />
        </div>
        <p className='Information'>Vous n'avez pas de compte ? <a href='#'>Inscrivez-vous !</a></p>
      </>
    );
}

export default Identification;