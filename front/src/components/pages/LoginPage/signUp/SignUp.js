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
  const [passwordConfirmationState, dispatchPasswordConfirmation] = useReducer(inputReducer, INITIAL_STATE);

  const [error, setError] = useState(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
        console.warn('validity')
        setFormIsValid(
            nameState.isValid && emailState.isValid && passwordState.isValid && passwordConfirmationState.value
        )
    }, 500)
    return () => {
        console.log('CLEANUP')
        clearTimeout(identifier);
    }
  }, [nameState.isValid, emailState.isValid, passwordState.isValid, passwordConfirmationState.isValid])

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

  const passwordConfirmationChangeHandler = (event) => {
    dispatchPasswordConfirmation({type: 'USER_INPUT', val: event.target.value, type_input: 'passwordConfirmation'});
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

  const validatePasswordConfirmationHandler = () => {
    dispatchPasswordConfirmation({type: 'INPUT_BLUR', type_input: 'passwordConfirmation'});
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await POST( '/api/auth/signup', {
        name: nameState.value,
        email: emailState.value,
        password: passwordState.value
      })
      const {data} = response;
      console.log(`Utilisateur ${data} bien créé !`);
      history.push("/");
    } catch (e) {
      setError(e.response.data.error);
      console.log(error);
    }
  }

  return (
    <div className="Sinscire">
      <Card>
        <h1 className='h1' >Créer un compte</h1>
        <form onSubmit={submitHandler}>
          <div className="Input">
            <label for="name">Nom :</label>
            <input
              id="name"
              label="Nom"
              isValid={nameState.isValid}
              type="name"
              value={nameState.value}
              onChange={nameChangeHandler}
              onBlur={validateNameHandler}
            />
          </div>
          <div className="Input">
            <label for="email">Email :</label>
            <input
              id="email"
              label="Email"
              isValid={emailState.isValid}
              type="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div className="Input">
            <label for="password">Mot de passe :</label>
            <input
              id="password"
              label="Mot de passe"
              isValid={passwordState.isValid}
              type="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className="Input">
            <label for="password">Confirmation du mot de passe :</label>
            <input
              id="password"
              label="Mot de passe"
              isValid={passwordConfirmationState.isValid}
              type="password"
              value={passwordState.value}
              onChange={passwordConfirmationChangeHandler}
              onBlur={validatePasswordConfirmationHandler}
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
