import React from 'react';
import {useState} from 'react';
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import {PUT} from '../../../assets/api/confAxios';

const PictureButton = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

    const [error, setError] = useState(null);

    const handlerChangePictureInput = (e) => {
        e.preventDefault();
		setSelectedFile(e.target.files[0]);
        
		setIsFilePicked(true);
	};

    const handlerChangePictureButton = async (event) => {
        event.preventDefault();

        const formData = new FormData();
		formData.append('imageUrl', selectedFile);

        const response = await PUT( '/api/auth/' + props.userId, formData)
        if(response.status === 201 ) {
            console.log('User bien modifié !');
            setError(false)
        } else {
            console.log(error);
            setError(true)
        }
    }
    
    return (
        <form onSubmit={handlerChangePictureButton}>
            <input 
                type="file" 
                name="file" 
                className="Bouton-link__SmallMarge" 
                onChange={handlerChangePictureInput}
            />
            {isFilePicked ? (
                <p>L'image est sélectionnée</p>
                ) : (
                <p>Choisir une image</p>
                )
            }
            <Button type='submit' className='Bouton-link__GreyButton' text="Changer la photo" />
        </form>
    )
}

export default PictureButton;