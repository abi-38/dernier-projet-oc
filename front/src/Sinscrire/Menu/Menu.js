import React from 'react';
import '../Menu/Menu.scss';
import '../../Reusable/Titres.scss';

const Menu = (props) => {
    return (
      <div className="Menu">
        <h2 className='h1Test__h2'>Menu</h2>
        <nav>
            <ul>
                <li className='Onglet'><a href='#'>S'identifer</a></li>
                <li><a href='#'>S'enregistrer</a></li>
            </ul>
        </nav>
      </div>
    );
}

export default Menu;