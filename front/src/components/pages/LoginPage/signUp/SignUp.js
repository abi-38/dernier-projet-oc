import React from 'react';
import {useState} from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../../UI/button/Button'
import '../../../UI/button/Button.scss';
import '../Sign.scss';
import {POST} from '../../../../assets/api/confAxios';
import Card from '../../../UI/card/Card';
import {
  Link
} from "react-router-dom";

// ajouter confirmation de mdp
const SignUp = () => {
    // déclarer les hook en 1er
    const history = useHistory();

    const [formIsValid, setFormIsValid] = useState ( false );
    const [nameValue, setNameValue] = useState ( "" );
    const [nameIsValid, setNameIsValid] = useState ( null );
    const [emailValue, setEmailValue] = useState ( "" );
    const [emailIsValid, setEmailIsValid] = useState ( null );
    const [passwordValue, setPasswordValue] = useState ( "" );
    const [passwordIsValid, setPasswordIsValid] = useState ( null );
    //const [selectedFile, setSelectedFile] = useState();
	  //const [isFilePicked, setIsFilePicked] = useState(false);
    //const [passwordConfirmationValue, setPasswordConfirmationValue] = useState ( "" );
    //const [passwordConfirmationIsValid, setPasswordConfirmationIsValid] = useState ( null );
    const [error, setError] = useState(null);

    const nameChangeHandler = (event) => {
      setNameValue(event.target.value) 
    };

    const emailChangeHandler = (event) => {
      setEmailValue(event.target.value) 
    };

    const passwordChangeHandler = (event) => {
      setPasswordValue(event.target.value)
    };

    //const changeFileHandler = (event) => {
      //setSelectedFile(event.target.files[0]);
      //setIsFilePicked(true);
    //};

    //const passwordConfirmationChangeHandler = (event) => {
      //setPasswordConfirmationValue(event.target.value)
    //};

    const validateNameHandler = () => {
      setNameIsValid(nameValue.length > 3);
      setFormIsValid(nameValue.length > 3 && emailValue.includes('@') && passwordValue.length > 6);
    }

    const validateEmailHandler = () => {
        setEmailIsValid(emailValue.includes('@'));
        setFormIsValid(nameValue.length > 3 && emailValue.includes('@') && passwordValue.length > 6);
    }

    const validatePasswordHandler = () => {
        setPasswordIsValid(passwordValue.length > 6);
        setFormIsValid(nameValue.length > 3 && emailValue.includes('@') && passwordValue.length > 6);
    }

    //const validatePasswordConfirmationHandler = () => {
     // setPasswordConfirmationIsValid(passwordConfirmationValue.length === passwordValue);
      //setFormIsValid(nameValue.length > 3 && emailValue.includes('@') && passwordValue.length > 6 && passwordConfirmationValue.length === passwordValue);
    //}

    const submitHandler = async (event) => {
        event.preventDefault();
      const response = await POST( '/api/auth/signup', {
        name: nameValue,
        email: emailValue,
        password: passwordValue
        //imageUrl: selectedFile
      })
      if(response.status === 201 ) {
        console.log('Utilisateur créé !')
        history.push("/");
      } else {
        setError('Une erreur a été rencontré lors de la création du compte') //mettre message api
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
                //isValid={namelIsValid}
                type="name"
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={validateNameHandler}
              />
            </div>
            <div className="Input">
              <label for="email">Email :</label>
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
              />
            </div>
          <Button type="submit" /*disabled={!formIsValid}*/ text='Créer son compte' />
        </form>
        </Card>
        <p className='Information'>Vous avez déjà un compte ? <Link to="/">Identifiez-vous !</Link></p>
      </div>
    );
  }

export default SignUp;