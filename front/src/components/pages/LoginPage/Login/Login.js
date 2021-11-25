import React, { useContext, useState } from 'react';
//import {useEffect} from 'react';
import '../../../UI/input/Input.scss';
//import SignInList from '../../../../assets/Listes/SignInList';
import '../Sign.scss';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import { POST } from '../../../../assets/api/confAxios';
import { Link, useHistory, Redirect } from "react-router-dom";
import Card from '../../../UI/card/Card';
import AuthContext from '../../../../hooks/Auth-context';

const Login = () => { 
    // déclarer les hook en 1er
    const ctx = useContext(AuthContext);
    const history = useHistory();
    
    //const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState ( "" );
    const [emailIsValid, setEmailIsValid] = useState ( null );
    const [passwordValue, setPasswordValue] = useState ( "" );
    const [passwordIsValid, setPasswordIsValid] = useState ( null );
    const [error, setError] = useState(null);
    //const [isLoaded, setIsLoaded] = useState(false);
    const [formIsValid, setFormIsValid] = useState ( false );

    if(ctx.isLogin()) {
        return <Redirect push to="/home" />
    }

    //const [emailState, dispatchEmail] = useReducer ( {value: "", isValid: null} );
    //const [passwordState, dispatchPassword] = useReducer ( {value: "", isValid: null} );

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
    const handlerSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            const response = await POST( '/api/auth/login', {
                email: emailValue,
                password: passwordValue
            })
            const {data} = response; // destructuring - récupérer clé data dans l'objet response -> récup ppté d'un objet
            console.log('Utilisateur bien connécté !')
            ctx.onLogin(data);
            history.push("/home");
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return (
        <>
            <div className="Sinscire">
                <Card>
                    <h1 className='h1'>Identifiez-vous</h1>
                    {error && <div>{error}</div>}
                    <form onSubmit={handlerSubmit}>
                        <div className="Input">
                            <label for="email">E-mail :</label>
                            <input
                                id="email"
                                label="Email"
                                //isValid={emailIsValid}
                                type="email"
                                value={emailValue}
                                onChange={emailChangeHandler}
                                onBlur={validateEmailHandler}
                            />
                        </div>
                        <div className="Input">
                            <label for="password">Mot de passe :</label>
                            <input
                                id="password"
                                label="Mot de passe"
                                //isValid={passwordIsValid}
                                type="password"
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                onBlur={validatePasswordHandler}
                                //ref={passwordInputRef} -> pas besoin à utiliser pour composant générique - cas spécifique
                            />
                        </div>
                        <Button type="submit" /*disabled={!formIsValid}*/ text='Se connecter' />
                    </form>
                </Card>
            <p className='Information'>Vous n'avez pas de compte ? <Link to="/sinscrire">Inscrivez-vous !</Link></p>
        </div>
    </>
    );
}

export default Login;
