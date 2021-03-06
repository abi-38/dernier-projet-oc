import { useState, useContext, useEffect } from 'react';
import { GET, PUT, DELETE } from '../../../assets/api/confAxios';
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
    const [user, setUser] = useState(null);
    const [picture, setPicture] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            const response =  await GET('/api/auth/me'); 
            const data = response.data;
            if (response.status === 200) { 
                setUser(data);
                setPicture(data.imageUrl);
                setName(data.name);
                setEmail(data.email);
                setDescription(data.description);
                console.log("Chargement de l'utilisateur réussi !");
            }
        }
        loadUser();
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
            <h1 className='h1'>{name}</h1>
            <div className='DivProfilAccount'>
                <img src={picture} className="ImgProfil" alt='photoPost' />                
            </div>
            <PictureButton onChangePictureHandler={handlerChangePicture} />           
            <div className="accountDiv">
                <h2 className='h1__h2Account'>Email</h2>
                <p>{email}</p>
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
    
}

export default Account;