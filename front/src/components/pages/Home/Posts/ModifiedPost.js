import React from 'react';
import {useState} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import {PUT} from '../../../../assets/api/confAxios';

const ModifiedPost = (props) => {
    const [error, setError] = useState(null);
    const [titleValue, setTitleValue] = useState ( "" );
    const [titleIsValid, setTitleIsValid] = useState ( null );
    const [descriptionValue, setDescriptionValue] = useState ( "" );
    const [descriptionIsValid, setDescriptionValid] = useState ( null );

    const handlerModifiedPostButton = async (event) => {

        event.preventDefault();

        const response = await PUT( '/api/post/' + props.postId, {
            title: titleValue,
            description: descriptionValue
        })
        if(response.status === 201 ) {
            console.log('Post bien modifié !');
            setError(false)
        } else {
            // ce chemin n'est pas atteint en cas d'erreur pk ?
            console.log(error);
            setError(true)
        }

    }

    return (
    
        <Button type='button' value={props.postId} onClick={handlerModifiedPostButton} className='Bouton-link__SmallMarge Bouton-link__GreyButton' text="Modifier" />
    )
}

export default ModifiedPost;