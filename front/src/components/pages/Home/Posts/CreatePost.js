import { useState, useEffect } from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import '../../../Layout/Header/Header.scss';
import './PostStyle.scss';
import Card from "../../../UI/card/Card";

const CreatePost = (props) => {
    const {onAddPostHandler} = props;

    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);;
    const [formIsValid, setFormIsValid] = useState ( false );
    const [titleValue, setTitleValue] = useState ( "" );
    const [titleIsValid, setTitleIsValid] = useState ( null );
    const [descriptionValue, setDescriptionValue] = useState ( "" );
    const [descriptionIsValid, setDescriptionValid] = useState ( null )
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(false);
        setFormIsValid(null);

        const identifier = setTimeout(() => {
            setFormIsValid(
                titleIsValid && descriptionIsValid
            );
        }, 500)

        return () => {
            console.log('CLEANUP')
            clearTimeout(identifier);
            setError('Remplissez bien le titre et la drecription.');
            console.log(error)
        }
    }, [titleIsValid, descriptionIsValid])

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

	const submitHandler = async (event) => {
        event.preventDefault();
        
		const formData = new FormData();
		formData.append('imageUrl', selectedFile);
        formData.append('title', titleValue);
        formData.append('description', descriptionValue);

        onAddPostHandler(formData);
	};
    
    return (
        
        <Card className='Card'>
            <h1 className='h1' >Derniers Post</h1>
            <form onSubmit={submitHandler} isValid={formIsValid}> 
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
