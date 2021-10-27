import React, { useContext, useEffect } from 'react';
import {useState} from 'react';
import {useReducer} from 'react';
//import {useEffect} from 'react';
import Input from '../../../UI/Input';
import '../../../UI/Input.scss';
import SignInList from '../../../../assets/Listes/SignInList';
import '../Sign.scss';
import Button from '../../../UI/Button';
import '../../../UI/Button.scss';
import {POST} from '../../../../assets/api/confAxios';
import { useHistory } from "react-router-dom";

//Reprendre notation type
const Login = () => { 
    // déclarer les hook en 1er
    const history = useHistory();


    const [formIsValid, setFormIsValid] = useState ( false );

    const [emailState, dispatchEmail] = useReducer ( {value: "", isValid: null} );
    const [passwordState, dispatchPassword] = useReducer ( {value: "", isValid: null} );

    const [emailValue, setEmailValue] = useState ( "" );
    const [emailIsValid, setEmailIsValid] = useState ( null );
    const [passwordValue, setPasswordValue] = useState ( "" );
    const [passwordIsValid, setPasswordIsValid] = useState ( null );
    const [error, setError] = useState(null);

    //const authCtx = useContext(AuthContext); //AuthContext à définir

    /*useEffect(() => {
        const identifier = setTimeout(() => {
            console.warn('validity')
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            )
        }, 500)

        return () => {
            console.log('CLEANUP')
            clearTimeout(identifier);
        }
    }, [emailState.isValid, passwordState.isValid])*/

    const emailChangeHandler = (event) => {
        /*const action = {
            type: 'USER_INPUT',
            val: event.target.value
        }
        dispatchEmail(action) // dispatchEmail à définir*/

        setEmailValue(event.target.value) 
    };

    const passwordChangeHandler = (event) => {
        /*const action = {
            type: 'USER_INPUT',
            val: event.target.value
        }
        dispatchPassword(action) // dispatchPassword à définir*/

        setPasswordValue(event.target.value)
    };

    const validateEmailHandler = () => {
        setEmailIsValid(emailValue.includes('@'));
        setFormIsValid(emailValue.includes('@') && passwordValue.length > 6);
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(passwordValue.length > 6);
        setFormIsValid(passwordValue.length > 6 && emailValue.includes('@'));
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        //if (formIsValid) {
            //authCtx.onLogin(emailState.value, passwordState.value);
            const response = await POST( '/api/auth/login', {
                email: emailValue,
                password: passwordValue
            } )
            if(response.status === 200 ) {
                const {data} = response; // destructuring - récupérer clé data dans l'objet response -> récup ppté d'un objet
                console.log(data);
                localStorage.setItem('token', data.token); // accolade = return juste pour les promesses .then

                history.push("/home");


                
            } else {
                setError('Une erreur a été rencontré lors de la connexion au compte') //mettre message api
                console.log(error);
            }
        //}   
    }

    return (
      <form onSubmit={submitHandler}>
        <input
            idt="email"
            //isValid={emailIsValid}
            type="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            className="Input"
        />
        <input
            id="password"
            //isValid={passwordIsValid}
            type="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            //ref={passwordInputRef} -> pas besoin à utiliser pour composant générique - cas spécifique
            className="Input"
        />
        <Button type="submit" className='Bouton-link__Connection' /*disabled={!formIsValid}*/ text='Se connecter' />
      </form>
    );
}

/*
{SignInList.map(champ => {
    return <div key={champ.id} className="Input">
    <Input champ={champ} />
    </div>
    })
} 
*/

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
