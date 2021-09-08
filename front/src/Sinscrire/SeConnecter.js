import React from 'react';
import Identification from './Identification/Identification';
import '../scss/_variables.scss';
import '../App.scss';
import '../Sinscrire/Sinscrire.scss';
import Header  from './Header/Header';

function SeConnecter() {
  return (
    <div className="Sinscire">
      <Header/>
      <Identification/>
    </div>
  );
}
  
export default SeConnecter;