import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Button from '../../UI/button/Button';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';
import {GET, PUT, DELETE} from '../../../assets/api/confAxios';
import Card from "../../UI/card/Card";

const Account = () => {
    const history = useHistory();

    const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState ( "" );
    const [passwordValue, setPasswordValue] = useState ( "" );

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});//à vérifier

    const handlerChangePictureInput = (e) => {
        e.preventDefault();
		setSelectedFile(e.target.files[0]);
        
		setIsFilePicked(true);
	};

    const handlerChangeDescriptionInput = (event) => {
        setDescriptionValue(event.target.value) 
    };

    const handlerChangePasswordInput = (event) => {
        setPasswordValue(event.target.value) 
    };
    
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

    const handlerChangePictureButton = async (event) => {
        event.preventDefault();
        const userID = user.id ;

        const formData = new FormData();
		formData.append('imageUrl', selectedFile);

        const response = await PUT( '/api/auth/' + userID, formData)
        if(response.status === 201 ) {
            console.log('User bien modifié !');
            setError(false)
        } else {
            // ce chemin n'est pas atteint en cas d'erreur pk ?
            console.log(error);
            setError(true)
        }
    }

    const handlerChangeDecriptionButton = async (event) => {
        event.preventDefault();
        const userID = user.id ;

        const response = await PUT( '/api/auth/' + userID, {
            description: descriptionValue,
        })
        if(response.status === 201 ) {
            console.log('User bien modifié !');
            setError(false)
        } else {
            // ce chemin n'est pas atteint en cas d'erreur pk ?
            console.log(error);
            setError(true)
        }
    }

    const handlerChangePasswordButton = async (event) => {
        event.preventDefault();
        const userID = user.id ;

        const response = await PUT( '/api/auth/password/' + userID, {
            password: passwordValue
        })
        if(response.status === 201 ) {
            console.log('User bien modifié !');
            setError(false)
        } else {
            // ce chemin n'est pas atteint en cas d'erreur pk ?
            console.log(error);
            setError(true)
        }
    }

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
        <div className='PostStyle PostStyle__Account'>
        <Card className='Card'>
            <h1 className='h1'>{user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={user.imageUrl} className="ImgProfil" alt='photoPost' />                
            </div>
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
            <div>
                <h2 className='h1__h2Account'>Email</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <h2 className='h1__h2Account'>Description</h2>
                <p>{user.description}</p>
                <form onSubmit={handlerChangeDecriptionButton}> 
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
                    <Button type='submit' className='Bouton-link__GreyButton' text="Changer sa description" />
                </form>
            </div>
            <div>
                <form onSubmit={handlerChangePasswordButton}>
                    <div className="Input">
                        <label for="password">Mot de passe :</label>
                        <input 
                            id="password" 
                            name="password" 
                            onChange={handlerChangePasswordInput}
                        >
                        </input>
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