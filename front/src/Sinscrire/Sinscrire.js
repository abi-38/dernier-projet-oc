import React from 'react';
import CreerCompte from './Identification/CreerCompte';
import '../scss/_variables.scss';
import '../App.scss';
import '../Sinscrire/Sinscrire.scss';

function Sinscrire() {
  return (
    <div className="Sinscire">
      <CreerCompte/>
    </div>
  );
}
  
export default Sinscrire;