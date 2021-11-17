import React from 'react';
import { useHistory } from "react-router-dom";

const Deconnexion = () => {
    const history = useHistory();

    /*event.preventDefault();

    localStorage.removeItem('token');
    console.log('Utilisateur bien déconnécté !');
    //history.push("/");*/

    const handlerDeconnexion = async (event) => {
        event.preventDefault();
        
        console.log('Utilisateur bien supprimé !');
        history.push("/");
        localStorage.removeItem('token');
    }

    handlerDeconnexion();
}

export default Deconnexion;