import React from 'react';
import {useState} from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';
import {PUT} from '../../../assets/api/confAxios';

const PasswordButton = (props) => {
    const [passwordValue, setPasswordValue] = useState ( "" );
    const [error, setError] = useState(null);

    const handlerChangePasswordInput = (event) => {
        setPasswordValue(event.target.value) 
    };

    const handlerChangePasswordButton = async (event) => {
        event.preventDefault();

        const response = await PUT( '/api/auth/password/' + props.userId, {
            password: passwordValue
        })
        if(response.status === 201 ) {
            console.log('User bien modifié !');
            setError(false)
        } else {            
            // ce chemin n'est pas atteint en cas d'erreur pk ?
            console.log(error);
            setError(true)
        }
    }
    
    return (
        <form onSubmit={handlerChangePasswordButton}>
            <div className="Input">
                <label for="password">Mot de passe :</label>
                <input 
                    id="password" 
                    name="password" 
                    onChange={handlerChangePasswordInput}
                >
                </input>
            </div>
            <Button type='submit' className='Bouton-link__SmallMarge Bouton-link__GreyButton' text="Changer son mot de passe" />
        </form>
    )
}

export default PasswordButton;