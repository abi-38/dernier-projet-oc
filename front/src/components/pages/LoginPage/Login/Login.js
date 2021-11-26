import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { POST } from '../../../../assets/api/confAxios';
import Button from '../../../UI/button/Button';
import Card from '../../../UI/card/Card';
import AuthContext from '../../../../context/Auth-context';
import '../../../UI/input/Input.scss';
import '../../../UI/button/Button.scss';
import '../Sign.scss';

const Login = () => { 
    // déclarer les hook en 1er
    const ctx = useContext(AuthContext);
    const history = useHistory();
    
    const [emailValue, setEmailValue] = useState ( "" );
    const [emailIsValid, setEmailIsValid] = useState ( null );
    const [passwordValue, setPasswordValue] = useState ( "" );
    const [passwordIsValid, setPasswordIsValid] = useState ( null );
    const [error, setError] = useState(null);
    const [formIsValid, setFormIsValid] = useState ( false );

    useEffect(() => {
        setError(false);
        setFormIsValid(null);

        const identifier = setTimeout(() => {
            setFormIsValid(
                emailIsValid && passwordIsValid
            );
        }, 500)

        return () => {
            console.log('CLEANUP')
            clearTimeout(identifier);
            setError('Cet email ou mot de passe ne correspond à aucun compte.');
        }
    }, [emailIsValid, passwordIsValid])

    if(ctx.isLogin()) {
        return <Redirect push to="/home" />
    }

    const emailChangeHandler = (event) => {
        setEmailValue(event.target.value) 
    };

    const passwordChangeHandler = (event) => {
        setPasswordValue(event.target.value)
    };

    const validateEmailHandler = () => {
        setEmailIsValid(emailValue.includes('@'));
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(passwordValue.length >= 6);
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
                    <form onSubmit={handlerSubmit} isValid={formIsValid}>
                        <div className="Input">
                            <label for="email">E-mail :</label>
                            <input
                                id="email"
                                label="Email"
                                isValid={emailIsValid}
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
                                isValid={passwordIsValid}
                                type="password"
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                onBlur={validatePasswordHandler}
                            />
                        </div>
                        <Button type="submit" disabled={!formIsValid} text='Se connecter' />
                    </form>
                </Card>
            <p className='Information'>Vous n'avez pas de compte ? <Link to="/sinscrire">Inscrivez-vous !</Link></p>
        </div>
    </>
    );
}

export default Login;
