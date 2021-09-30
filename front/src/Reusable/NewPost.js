import React from 'react';
import Button from './Button';
import PostStyle from '../Reusable/PostStyle.scss';
import Titres from './Titres.scss';

const NewPost = () => {
    return (
        <div className='Identification'>
            <h1 className='h1' >Derniers Post</h1>
            <form>
                <label className='h1__h2' for="story">Exprimez-vous</label>
                <textarea id="story" name="story" rows="5" cols="33" placeholder="Ajouter du texte..."></textarea>
            </form>
            <Button type='button' text="Choisir une image" />
            <Button type='button' text="Publier" />
        </div>
    );
}

export default NewPost;