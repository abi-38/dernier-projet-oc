import {useState} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import '../../../Layout/Header/Header.scss';
import './PostStyle.scss';
import {POST} from '../../../../assets/api/confAxios';
import Card from "../../../UI/card/Card";

const CreatePost = (props) => {
    const {onSubmit} = props;

    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);;

    const [formIsValid, setFormIsValid] = useState ( false );
    const [titleValue, setTitleValue] = useState ( "" );
    const [titleIsValid, setTitleIsValid] = useState ( null );
    const [descriptionValue, setDescriptionValue] = useState ( "" );
    const [descriptionIsValid, setDescriptionValid] = useState ( null )
    

    const [error, setError] = useState(null);

    const titleChangeHandler = (event) => {
        setTitleValue(event.target.value) 
      };
  
    const descriptionChangeHandler = (event) => {
    setDescriptionValue(event.target.value) 
    };

    const validateTitleHandler = () => {
        setTitleIsValid(titleValue.length > 3);
        setFormIsValid(titleValue.length > 3 && descriptionValue.length > 3);
    }

    const validateDescriptionHandler = () => {
        setDescriptionValid(descriptionValue.length > 3);
        setFormIsValid(titleValue.length > 3 && descriptionValue.length > 3);
    }

	const changeHandler = (e) => {
        e.preventDefault();
		setSelectedFile(e.target.files[0]);
        
		setIsFilePicked(true);
	};
	
    const handleOnSubmit = (formData) => {
        onSubmit(formData);
    }

    const formData = new FormData();
    formData.append('imageUrl', selectedFile);
    formData.append('title', titleValue);
    formData.append('description', descriptionValue);
    
    
    const renderSuccessMessage = () => {
        return formIsValid && `Votre post a bien été créé !`;
    }

    const renderErrorMessage = () => {
        console.warn(error);
        return error && `Une erreure est survenue pendant la création du post !`;
    }
    
    return (
        
        <Card className='Card'>
            <h1 className='h1' >Derniers Post</h1>
            <form onSubmit={() => handleOnSubmit(formData)}> 
                <div className='Input'>
                    <label className='h1__h2' for="description">Exprimez-vous</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        rows="5" 
                        cols="33" 
                        placeholder="Ajouter du texte..."
                        onChange={descriptionChangeHandler}
                        onBlur={validateDescriptionHandler}
                    >
                    </textarea>
                </div>
                <div className='Input'>
                    <label className='h1__h2' for="titre">Titre</label>
                    <input 
                        id="titre" 
                        name="titre" 
                        onChange={titleChangeHandler}
                        onBlur={validateTitleHandler}
                    >
                    </input>
                </div>
                <div>
			        <input 
                        type="file" 
                        name="file" 
                        className="Bouton-link__SmallMarge" 
                        onChange={changeHandler}
                    />
                    {isFilePicked ? (
                        <p>L'image est sélectionnée</p>
                        ) : (
                        <p>Choisir une image</p>
                        )
                    }
                </div>
				<Button type='submit' text="Publier" />
            </form>
            
        </Card>
    );
}

export default CreatePost;
