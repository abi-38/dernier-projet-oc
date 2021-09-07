import React from 'react';
import Input from '../../Reusable/Input';
import Button from '../../Reusable/Button';
import '../Identification/Identification.scss';
/* Faire une liste ? */

function Identification() {
    return (
      <>
        <div className="Identification">
          <h1 className='h1Test' >Créer un compte</h1>
          <form>
              <Input label={'Nom'} />
              <Input label={'Email'} />
              <Input label={'Mot de passe'} />
              <Input label={'Confirmer Mot de passe'} />
          </form>
          <Button text={'Se connecter'} />
        </div>
        <p className='Information'>Vous avez déjà un compte ? <a href='#'>Identifiez-vous !</a></p>
      </>
    );
}

export default Identification;