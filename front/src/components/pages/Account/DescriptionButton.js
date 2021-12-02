import {useState} from 'react';
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';

const DescriptionButton = (props) => {
    const {onAddPostHandler} = props;

    const [descriptionValue, setDescriptionValue] = useState ( "" );

    const handlerChangeDescriptionInput = (event) => {
        setDescriptionValue(event.target.value) 
    };

    


    const submitHandler = async (event) => {
        event.preventDefault();
        onAddPostHandler(descriptionValue);
        setDescriptionValue(" ") // ne fonctionne pas... 
        console.log(descriptionValue);


    }

    
    return (
        <form onSubmit={submitHandler}> 
            <div className='Input'>
                <label className='h1__h2' for="description">Votre nouvelle description</label>
                <textarea 
                id="description" 
                name="description" 
                rows="5" 
                cols="33" 
                placeholder="Ajouter du texte..."
                onChange={handlerChangeDescriptionInput}
            >
            </textarea>
            </div>
            <Button type='submit' className='Bouton-link__GreyButton Bouton-link__SmallMarge' text="Changer sa description" />
        </form>
    )
}

export default DescriptionButton;