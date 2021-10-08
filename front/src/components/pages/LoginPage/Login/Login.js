import React from 'react';
import {useState} from 'react';
import Input from '../../../UI/Input';
import '../../../UI/Input.scss';
import SignUpList from '../../../../assets/Listes/SignUpList';
import SignInList from '../../../../assets/Listes/SignInList';
import Button from '../../../UI/Button';
import '../../../UI/Button.scss';
import {POST} from '../../../../assets/api/confAxios';

//Reprendre notation type
const Login = ( {props: any} ) => { 
    const [email, setEmail] = useState ( null );
    const [password, setPassword] = useState ( null );
    const [error, setError] = useState(null);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await POST( {input: 'http://localhost:3000/api/signin'}, {init: {
            method: 'POST',
            body: JSON.stringify( {value: {email, password}} ),
            headers: {
                'Content-type': 'application/json'
            }
        }} )
        if(response.status === 200 ) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
        } else {
            setError('Une erreur a été rencontré lors de la récupération des posts') //mettre message api
        }
        
    }

    return (
      <form onSubmit={handleFormSubmit}>
        {SignInList.map(champ => {
            return <div key={champ.id} className="Input">
            <Input champ={champ} />
            </div>
            })
        }
        <Button type="button" className='Bouton-link__Connection' text='Se connecter' />
      </form>
    );
}

/*
const Login = ( {props: any} ) => { 

    return (
      <form>
        {seConnecterList.map(champ => {
            return <div key={champ.id} className="Input">
            <Input champ={champ} />
            </div>
            })
        }
        <Button type="button" className='Bouton-link__Connection' text='Se connecter' />
      </form>
    );
}*/

export default Login;
