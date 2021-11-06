import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import Button from '../../../UI/button/Button';
import '../../../UI/button/Button.scss';
import {GET} from '../../../../assets/api/confAxios';
//const GET = require('../api/confAxios'); -> interdit + ne pas mettre le require avant import
import Card from "../../../UI/card/Card";

const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const loadPosts = async () => {
            const response =  await GET('/api/post');
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setPosts(data);
                console.log('Le post a bien été créé !')
                //comment envoyé un success message à l'utilisateur ?
            } else {
                setError('Une erreur a été rencontré lors de la récupération des posts'); //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadPosts();
        setIsLoaded(false);
    }, [])
    
    const renderPost = (posts) => {
        console.log(posts)
        //essayer desctructuring 
        //const {id, imageUrl, createdAt, title, description} = props; + retirer props partout!
        return <li key={posts.id} className="Post">
            <Card className='Card'>
                <div className='DivProfil'>
                    <img src={/*posts.userId.imageUrl*/ posts.imageUrl} className="ImgProfil" alt='photoPost' />
                </div>
                <div>
                    {posts.createdAt}
                </div>
                <div className='DivPhoto'>
                    <img src={posts.imageUrl} className="ImgPost" alt='photoPost' />
                </div>
                <div>
                    {posts.title} <br/>
                    {posts.description}
                </div>
                <Button type='button' className='Bouton-link__GreyButton' text="Supprimer" />
            </Card>
        </li>
    }
    // accolades = return

    return (
    
        <ul>
            {posts.map(post => {
                return renderPost(post)
            })}
        </ul>
    )
}

export default Post;