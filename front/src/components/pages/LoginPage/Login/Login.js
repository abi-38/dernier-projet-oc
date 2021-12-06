import React, { useState, useReducer, useEffect, useContext } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { GET, POST } from '../../../../assets/api/confAxios';
import Button from '../../../UI/button/Button';
import Card from '../../../UI/card/Card';
import AuthContext from '../../../../context/Auth-context';
import '../../../UI/button/Button.scss';
import '../Sign.scss';
import inputReducer from '../../../../assets/useReducer/inputReducer';
import INITIAL_STATE from '../../../../assets/useReducer/INITIAL_STATE';

const Login = () => {
    // déclarer les hook en 1er
    const ctx = useContext(AuthContext);
    const history = useHistory();

    const [emailState, dispatchEmail] = useReducer(inputReducer, INITIAL_STATE);
    const [passwordState, dispatchPassword] = useReducer(inputReducer, INITIAL_STATE);

    const [error, setError] = useState(null);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.warn('validity')
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            )
        }, 500)
        // j'utilise un timeout pour éviter d'appliquer cette fonction à chaque caractères
        // n'est pas obligatoire mais permet d'alléger - meilleure performance
        return () => {
            // bien néttoyer la fonction après le timeOut
            console.log('CLEANUP')
            clearTimeout(identifier);
        }
    }, [emailState.isValid, passwordState.isValid])

    if (ctx.isLogin()) {
        return <Redirect push to="/home" />
    }

    const emailChangeHandler = (event) => {
        const action = {
            type: 'USER_INPUT',
            val: event.target.value,
            type_input: 'email'
        }
        dispatchEmail(action);
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'USER_INPUT',
            val: event.target.value,
            type_input: 'password'
        });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR', type_input: 'email' });
    }

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR', type_input: 'password' });
    }

    const handlerSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await POST('/api/auth/login', {
                email: emailState.value,
                password: passwordState.value
            })
            const { data } = response; // destructuring - récupérer clé data dans l'objet response -> récup ppté d'un objet
            console.log('Utilisateur bien connécté !')
            ctx.onLogin(data);

            const responseUser = await GET('/api/auth/me');
            const dataUser = responseUser.data;
            ctx.saveAdmin(dataUser);

            history.push("/home");
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return (
        <div className="Sinscire">
            <Card>
                <h1 className='h1'>Identifiez-vous</h1>
                {error && <div>{error}</div>}
                <form onSubmit={handlerSubmit} >
                    <div className="Input">
                        <label htmlFor="email">E-mail :</label>
                        <input
                            id="email"
                            label="Email"
                            type="email"
                            value={emailState.value}
                            onChange={emailChangeHandler}
                            onBlur={validateEmailHandler}
                        />
                    </div>
                    <div className="Input">
                        <label htmlFor="password">Mot de passe :</label>
                        <input
                            id="password"
                            label="Mot de passe"
                            type="password"
                            value={passwordState.value}
                            onChange={passwordChangeHandler}
                            onBlur={validatePasswordHandler}
                        />
                    </div>
                    <Button type="submit" disabled={!formIsValid} text='Se connecter' />
                </form>
            </Card>
            <p className='Information'>Vous n'avez pas de compte ? <Link to="/sinscrire">Inscrivez-vous !</Link></p>
        </div>
    );
}

export default Login;
