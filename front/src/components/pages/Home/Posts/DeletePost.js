import React from 'react';
import {useState} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import {DELETE} from '../../../../assets/api/confAxios';

const DeletePost = (props) => {
    const [error, setError] = useState(null);


    const handlerDeletePostButton = async (event) => {
        event.preventDefault();

        const response = await DELETE( '/api/post/' + props.postId) // + Comment récupérer le post.id)
        if(response.status === 200 ) {
            console.log('Post bien supprimé !');
            setError(false)
        } else {
            setError('Une erreur a été rencontré lors de la suppression du post') //mettre message api
            console.log(error);
            setError(true)
        }

    }

    return (
    
        <Button type='button' value={props.postId} onClick={handlerDeletePostButton} className='Bouton-link__GreyButton' text="Supprimer" />
    )
}

export default DeletePost;