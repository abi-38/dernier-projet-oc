import React from 'react';
import {useState} from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import {DELETE} from '../../../assets/api/confAxios';

const DeleteButton = (props) => {
    const history = useHistory();

    const [error, setError] = useState(null);

    const handlerDeleteButton = async (event) => {
        event.preventDefault();
        
        const response = await DELETE( '/api/auth/' + props.userId)
        if(response.status === 200 ) {
            console.log('Utilisateur bien supprimé !');
            setError(false);
            history.push("/");
            localStorage.removeItem('token');
        } else {
            setError('Une erreur a été rencontré lors de la suppression du utilisateur') //mettre message api
            console.log(error);
            setError(true)
        }
    }

    const renderErrorMessageCancelAccount = () => {
        return error && `Une erreure est survenue pendant la suppression du compte !`;
    }
    
    return (
        <>
            <Button type='button' onClick={handlerDeleteButton} text="Supprimer son compte" />
            <p>{renderErrorMessageCancelAccount()}</p>
        </>
    )
}

export default DeleteButton;