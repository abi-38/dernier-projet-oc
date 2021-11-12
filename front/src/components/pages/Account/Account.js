import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';
import {GET, DELETE} from '../../../assets/api/confAxios';
import Card from "../../UI/card/Card";

const Account = () => {
    const history = useHistory();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});//à vérifier
    
    useEffect(() => {
        const loadUser = async () => {
            const response =  await GET('/api/auth/me'); 
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setUser(data);
                console.log(data);
                console.log("Chargement de l'utilisateur réussi !");
                //localStorage.setItem('imageUser', data.imageUrl);
                
            } else {
                setError("Une erreur a été rencontré lors de la récupération de l'utilisateur"); //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadUser();
        setIsLoaded(false);
    }, [])

    const handlerDeleteButton = async (event) => {
        event.preventDefault();
        const userID = user.id ;
        const response = await DELETE( '/api/auth/' + userID)
        if(response.status === 200 ) {
            console.log('Utilisateur bien supprimé !');
            setError(false);
            history.push("/");
            localStorage.removeItem('token');
        } else {
            setError('Une erreur a été rencontré lors de la suppression du utilisateur') //mettre message api
            console.log(error);
            setError(true)
        }
    }

    const renderErrorMessageCancelAccount = () => {
        return error && `Une erreure est survenue pendant la suppression du compte !`;
    }
    
    return (
        <div className='PostStyle'>
        <Card className='Card'>
            <h1 className='h1'>{user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={user.imageUrl} className="ImgProfil" alt='photoPost' />
            </div>
            <Button type='button' className='Bouton-link__GreyButton' text="Changer la photo" />
            <div>
                <h2 className='h1__h2Account'>Email</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <h2 className='h1__h2Account'>Description</h2>
                <p>{user.description}</p>
                <form > 
                    <div className='Input'>
                        <label className='h1__h2' for="description">Votre nouvelle description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            rows="5" 
                            cols="33" 
                            placeholder="Ajouter du texte..."
                        >
                        </textarea>
                    </div>
                    <Button type='submit' className='Bouton-link__GreyButton' text="Changer sa description" />
                </form>
            </div>
            <div>
                <form >
                    <div className="Input">
                        <label for="password">Mot de passe :</label>
                        <input
                            id="password"
                            label="Mot de passe"
                            type="password"
                        />
                    </div>
                    <Button type='submit' className='Bouton-link__GreyButton' text="Changer son mot de passe" />
                </form>
                <Button type='button' onClick={handlerDeleteButton} text="Supprimer son compte" />
                <p>{renderErrorMessageCancelAccount()}</p>
            </div>
        </Card>
        </div>
    )
}

export default Account;