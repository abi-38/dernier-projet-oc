import { useState, useEffect } from 'react';
import Button from '../../../UI/button/Button';
import Card from "../../../UI/card/Card";
import '../../../UI/button/Button.scss';
import '../../../Layout/Header/Header.scss';
import '../Posts/PostStyle.scss';
 
const CreateComment = (props) => {
    const { onAddCommentHandler } = props;
    const [formIsValid, setFormIsValid] = useState ( false );

    const [titleValue, setTitleValue] = useState ( "" );
    const [titleIsValid, setTitleIsValid] = useState ( null );
    const [textValue, setTextValue] = useState ( "" );
    const [textIsValid, setTextIsValid] = useState ( null );

    const [error, setError] = useState(null);

    useEffect(() => {
        setFormIsValid(null);

        const identifier = setTimeout(() => {
            setFormIsValid(
                titleIsValid && textIsValid
            );
        }, 500)

        return () => {
            console.log('CLEANUP')
            clearTimeout(identifier);
        }
    }, [titleIsValid, textIsValid])

    const titleChangeHandler = (event) => {
        setTitleValue(event.target.value) 
      };
  
    const textChangeHandler = (event) => {
        setTextValue(event.target.value) 
    };
    
    const validateTitleHandler = () => {
        setTitleIsValid(titleValue.length >= 3);
        setFormIsValid(titleValue.length >= 3 && textValue.length >= 3);
    }

    const validateTextHandler = () => {
        setTextIsValid(textValue.length >= 3);
        setFormIsValid(titleValue.length >= 3 && textValue.length >= 3);
    }
    
    // Au click du bouton Submit
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', titleValue);
            formData.append('text', textValue);

            setFormIsValid(false) ;
            setTitleValue("");
            setTitleIsValid(null);
            setTextValue("");
            setTextIsValid(null);
            onAddCommentHandler(formData);
            
        } catch (e) {
            setError(e.response.data.error);
        }
    };
    
    return (
    <>
    <Card className='Card'>
        <h2 className='h1__h2' >Publier un commentaire</h2>
        {error && <div>{error}</div>}
        <form onSubmit={submitHandler} className="Home"> 
            <div className='Input'>
                <label className='h1__h2' htmlFor="titre">Titre</label>
                <input 
                    id="titre" 
                    name="titre" 
                    onChange={titleChangeHandler}
                    onBlur={validateTitleHandler}
                    value={titleValue}
                >
                </input>
            </div>
            <div className='Input'>
                <label className='h1__h2' htmlFor="text">Exprimez-vous</label>
                <textarea 
                    id="text" 
                    name="text" 
                    rows="5" 
                    cols="33" 
                    placeholder="Ajouter du texte..."
                    onChange={textChangeHandler}
                    onBlur={validateTextHandler}
                    value={textValue}
                >
                </textarea>
            </div>
            <div className="publishButton">   
                <Button type='submit' text="Publier" disabled={!formIsValid} />
            </div>
        </form>
    </Card>
    </>
    );
}
 
  export default CreateComment;