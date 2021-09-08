import React from 'react';
import CreerCompte from './Identification/CreerCompte';
import '../scss/_variables.scss';
import '../App.scss';
import '../Sinscrire/Sinscrire.scss';
import Header  from './Header/Header';

function Sinscrire() {
  return (
    <div className="Sinscire">
      <Header/>
      <CreerCompte/>
    </div>
  );
}
  
export default Sinscrire;