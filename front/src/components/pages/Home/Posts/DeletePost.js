import React from 'react';
import {useState} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import {DELETE} from '../../../../assets/api/confAxios';
import Post from './Post';

const DeletePost = () => {

    return (
            <Button type='button' className='Bouton-link__GreyButton' text="Supprimer" />
    )
}

export default DeletePost;