import { useState, useContext, useEffect } from 'react';
import { PUT, DELETE } from '../../../assets/api/confAxios';
import { Redirect } from "react-router-dom";
import Card from "../../UI/card/Card";
import Button from '../../UI/button/Button';
import DescriptionButton from './DescriptionButton';
import PictureButton from './PictureButton';
import AuthContext from '../../../context/Auth-context';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';

const Account = () => {
    const ctx = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [picture, setPicture] = useState('');
    const [description, setDescription] = useState('');

    /*useEffect(() => {
        const loadUser = async () => {
            
            try { 
                const response =  await GET('/api/auth/me'); 
                const data = response.data;
                setUser(data);
                setPicture(data.imageUrl);
                setDescription(data.description);
                console.log("Chargement de l'utilisateur réussi !");
                
            } catch (e) {
                setError(e.response.data.error); 
            }
        }
        loadUser();
    }, [])*/

    useEffect(() => {
        const loadUser = async () => {
            
            try { 
                setUser(ctx.user);
                setPicture(ctx.user.imageUrl);
                setDescription(ctx.user.description);
                console.log("Chargement de l'utilisateur réussi !");
                
            } catch (e) {
                setError({message : "une erreur est survenue !"}); 
            }
        }
        loadUser();
    }, [ctx.user])

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
            setError(e.response.data.error);
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
        } catch (e) {
            console.log(e);
            setError(e.response.data.error);
        }
    }

    
    const handlerDeleteAccount = async () => {
        try {
            const response = await DELETE( '/api/auth/' + user.id)
            ctx.onLogout();
            console.log(response)
        } catch (e) {
        setError(e.response.data.error);
        }
    }
    
    return (
        <div className='PostStyle PostStyle__Account'>
        <Card className='Card Card__Account'>
            {error && <div>{error}</div>}
            <h1 className='h1'>{ctx.user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={picture} className="ImgProfil" alt='photoPost' />                
            </div>
            <PictureButton onChangePictureHandler={handlerChangePicture} />           
            <div className="accountDiv">
                <h2 className='h1__h2Account'>Email</h2>
                <p>{ctx.user.email}</p>
            </div>
            <div className="accountDiv">
                <h2 className='h1__h2Account'>Description</h2>
                <p>{description}</p>
                <DescriptionButton onAddPostHandler={handlerChangeDescription} />
                <Button onClick={handlerDeleteAccount} className='Bouton-link' text="Supprimer son compte" />
            </div>
        </Card>
        </div>
    )
/*
    return (
        <div className='PostStyle PostStyle__Account'>
        <Card className='Card Card__Account'>
            {error && <div>{error}</div>}
            <h1 className='h1'>{user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={picture} className="ImgProfil" alt='photoPost' />                
            </div>
            <PictureButton onChangePictureHandler={handlerChangePicture} />           
            <div className="accountDiv">
                <h2 className='h1__h2Account'>Email</h2>
                <p>{user.email}</p>
            </div>
            <div className="accountDiv">
                <h2 className='h1__h2Account'>Description</h2>
                <p>{description}</p>
                <DescriptionButton onAddPostHandler={handlerChangeDescription} />
                <Button onClick={handlerDeleteAccount} className='Bouton-link' text="Supprimer son compte" />
            </div>
        </Card>
        </div>
    )*/
}

export default Account;