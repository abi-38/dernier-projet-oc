import React from 'react';
import {useState} from 'react';
import Input from '../../UI/Input';
import '../../UI/Input.scss';
import SignUpList from '../../../assets/Listes/SignUpList';
import './Sign.scss';
import Button from '../../UI/Button';
import '../../UI/Button.scss';
import {POST} from '../../../assets/api/confAxios';
import {
  Link
} from "react-router-dom";

const SignUp = ( {props: any} ) => {
    const [name, setName] = useState ( "" );
    const [email, setEmail] = useState ( "" );
    const [password, setPassword] = useState ( "" );
    const [error, setError] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await POST( {input: 'http://localhost:3000/api/signin'}, {init: {
            method: 'POST',
            body: JSON.stringify( {value: {name, email, password}
                  } ),
            headers: {
                'Content-type': 'application/json'
            }
        }} )
        if(response.status === 200 ) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
        } else {
            setError('Une erreur a été rencontré lors de la création de compte') //mettre message api
        }
        
    }

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
          <Button className='Bouton-link__Connection' type='submit' text='Se connecter' />
          </form>
        </div>
        <p className='Information'>Vous avez déjà un compte ? <Link to="/">Identifiez-vous !</Link></p>
      </div>
    );
}
  
export default SignUp;