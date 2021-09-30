import React from 'react';
import {useState} from 'react';
import '../../Reusable/Button.scss';
import Input from '../../Reusable/Input';
import sinscrireList from '../../Listes/sinscrireList';
import seConnecterList from '../../Listes/seConnecterList';
import '../../Reusable/Input.scss';
import Button from '../../Reusable/Button';

/*Reprendre notation type*/
const Login = ( {props: any} ) => { 
    const [email, setEmail] = useState ( {initialState: ''} );
    const [password, setPassword] = useState ( {initialState: ''} );

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch( {input: 'http://localhost:3000/api/signin'}, {init: {
            method: 'POST',
            body: JSON.stringify( {value: {email, password}} ),
            headers: {
                'Content-type': 'application/json'
            }
        }} )
        const data = await response.json();
        localStorage.setItem('token', data.token);
    }

    return (
      <form onSubmit={handleFormSubmit}>
        {seConnecterList.map(champ => {
            return <div key={champ.id} className="Input">
            <Input champ={champ} />
            </div>
            })
        }
        <Button type="button" className='Bouton-link__Connection' text='Se connecter' />
      </form>
    );
}

export default Login;
