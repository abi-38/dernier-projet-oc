import React from 'react';
import { useState, useContext, useEffect } from 'react';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';
import {GET, PUT} from '../../../assets/api/confAxios';
import Card from "../../UI/card/Card";
import DeleteButton from './DeleteButton';
import PasswordButton from './PasswordButton';
import DescriptionButton from './DescriptionButton';
import PictureButton from './PictureButton';
import AuthContext from '../../../context/Auth-context';
import { useHistory, Redirect } from "react-router-dom";

const Account = () => {
    const ctx = useContext(AuthContext);
    const history = useHistory();  
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});

    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            const response =  await GET('/api/auth/me'); 
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setUser(data);
                //console.log(data);
                setPicture(data.imageUrl);
                setDescription(data.description);
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

    if(!ctx.isLogin()) {
        return <Redirect push to="/" />
    }

    const handlerChangePicture = async (formData) => {
        
        try {
            const response = await PUT( '/api/auth/' + user.id, formData)
            console.log('User bien modifié !');
            const {data} = response;
            setPicture(data.imageUrl);
        } catch (e) {
            console.log(e);
        }
    }

    const handlerChangeDescription = async (nouvelleDescription) => {

        try {
            const response = await PUT( '/api/auth/'+ user.id, {
                description: nouvelleDescription,
            })
            console.log('User bien modifié !');
            const {data} = response;
            setDescription(data.description);
            //setDescriptionValue("");
        } catch (e) {
            console.log(e);
        }
    }
    
    return (
        <div className='PostStyle PostStyle__Account'>
        <Card className='Card'>
            <h1 className='h1'>{user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={picture} className="ImgProfil" alt='photoPost' />                
            </div>
            <PictureButton onChangePictureHandler={handlerChangePicture} />           
            <div>
                <h2 className='h1__h2Account'>Email</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <h2 className='h1__h2Account'>Description</h2>
                <p>{description}</p>
                <DescriptionButton onAddPostHandler={handlerChangeDescription} />
            </div>
            <div>
                <PasswordButton userId={user.id}/>
                <DeleteButton userId={user.id}/>
            </div>
        </Card>
        </div>
    )
}

export default Account;