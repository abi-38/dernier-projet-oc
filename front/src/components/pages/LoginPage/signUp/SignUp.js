import React, { useState, useReducer, useEffect, useContext } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import { POST } from '../../../../assets/api/confAxios';
import Button from '../../../UI/button/Button'
import Card from '../../../UI/card/Card';
import AuthContext from '../../../../context/Auth-context';
import '../../../UI/button/Button.scss';
import '../Sign.scss';
import inputReducer from '../../../../assets/useReducer/inputReducer';
import INITIAL_STATE from '../../../../assets/useReducer/INITIAL_STATE';

const SignUp = () => {
  const ctx = useContext(AuthContext);
  const history = useHistory();

  const [formIsValid, setFormIsValid] = useState ( false );

  const [nameState, dispatchName] = useReducer(inputReducer, INITIAL_STATE);
  const [emailState, dispatchEmail] = useReducer(inputReducer, INITIAL_STATE);
  const [passwordState, dispatchPassword] = useReducer(inputReducer, INITIAL_STATE);

  const [error, setError] = useState(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
        console.warn('validity')
        setFormIsValid(
            nameState.isValid && emailState.isValid && passwordState.isValid
        )
    }, 500)
    return () => {
        console.log('CLEANUP')
        clearTimeout(identifier);
    }
  }, [nameState.isValid, emailState.isValid, passwordState.isValid])

  if(ctx.isLogin()) {
    return <Redirect push to="/home" />
  };

  const nameChangeHandler = (event) => {
    const action = {
      type: 'USER_INPUT',
      val: event.target.value,
      type_input: 'name'
    }
    dispatchName(action);
  };

  const emailChangeHandler = (event) => {
    const action = {
        type: 'USER_INPUT',
        val: event.target.value,
        type_input: 'email'
    }
    dispatchEmail(action);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value, type_input: 'password'});
  };

  const validateNameHandler = () => {
    dispatchName({type: 'INPUT_BLUR', type_input: 'name'});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR', type_input: 'email'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR', type_input: 'password'});
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await POST( '/api/auth/signup', {
        name: nameState.value,
        email: emailState.value,
        password: passwordState.value
      })
      history.push("/");
    } catch (e) {
      setError(e.response.data.error);
    }
  }

  return (
    <div className="Sinscire">
      <Card>
        <h1 className='h1' >Créer un compte</h1>
        {error && <div>{error}</div>}
        <form onSubmit={submitHandler}>
          <div className="Input">
            <label htmlFor="name">Nom :</label>
            <input
              id="name"
              label="Nom"
              type="name"
              value={nameState.value}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
            />
          </div>
          <div className="Input">
            <label htmlFor="email">Email :</label>
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
          <Button type="submit" disabled={!formIsValid} text='Créer son compte' />
        </form>
      </Card>
      <p className='Information'>Vous avez déjà un compte ? <Link to="/">Identifiez-vous !</Link></p>
    </div>
  );
}

export default SignUp;