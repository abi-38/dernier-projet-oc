import { useState } from 'react';
import Button from '../../../UI/button/Button';
import Card from "../../../UI/card/Card";
import '../../../UI/button/Button.scss';
import '../../../Layout/Header/Header.scss';
import '../Posts/PostStyle.scss';
import './Comment.scss';
 
const CreateComment = (props) => {
    const { onAddCommentHandler } = props;

    const [textValue, setTextValue] = useState ( "" );
    const [textIsValid, setTextIsValid] = useState ( null );

    const [error, setError] = useState(null);
  
    const textChangeHandler = (event) => {
        setTextValue(event.target.value) 
    };

    const validateTextHandler = () => {
        setTextIsValid(textValue.length >= 3);
    }
    
    // Au click du bouton Submit
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            setTextValue("");
            setTextIsValid(null);
            onAddCommentHandler(textValue);
            
        } catch (e) {
            setError(e.response.data.error);
        }
    };
    
    return (
    <>
    <Card className='Card'>
        <div className='CreateComment'>
            <h2 className='TitreComment' >Publier un commentaire</h2>
            {error && <div>{error}</div>}
            <form onSubmit={submitHandler} className='FormComment'> 
                <div>
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
                    <Button type='submit' text="Publier" disabled={!textIsValid} />
                </div>
            </form>
        </div>
    </Card>
    </>
    );
}
 
export default CreateComment;
