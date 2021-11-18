import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import '../../UI/button/Button.scss';
import '../../Layout/Header/Header.scss';
import '../../pages/Home/Posts/PostStyle.scss';
import '../Account/Account.scss';
import {GET} from '../../../assets/api/confAxios';
import Card from "../../UI/card/Card";
import DeleteButton from './DeleteButton';
import PasswordButton from './PasswordButton';
import DescriptionButton from './DescriptionButton';
import PictureButton from './PictureButton';

const Account = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState({});
    
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
    
    return (
        <div className='PostStyle PostStyle__Account'>
        <Card className='Card'>
            <h1 className='h1'>{user.name}</h1>
            <div className='DivProfilAccount'>
                <img src={user.imageUrl} className="ImgProfil" alt='photoPost' />                
            </div>
            <PictureButton userId={user.id}/>           
            <div>
                <h2 className='h1__h2Account'>Email</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <h2 className='h1__h2Account'>Description</h2>
                <p>{user.description}</p>
                <DescriptionButton userId={user.id}/>
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