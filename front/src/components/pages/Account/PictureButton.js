import {useState} from 'react';
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';

const PictureButton = (props) => {
    const {onChangePictureHandler} = props;

    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);

    const handlerChangePictureInput = (e) => {
        e.preventDefault();
		setSelectedFile(e.target.files[0]);
        
		setIsFilePicked(true);
	};

    const submitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
		formData.append('imageUrl', selectedFile);

        onChangePictureHandler(formData);        
    }
    
    return (
        <form onSubmit={submitHandler}>
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