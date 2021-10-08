import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
//import PostList from '../../../../assets/Listes/PostList';
import Button from '../../../UI/Button';
//import PostStyle from '../Reusable/PostStyle.scss';
import {GET} from '../../../../assets/api/confAxios';
//const GET = require('../api/confAxios'); -> interdit + ne pas mettre le require avant import

const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        const loadPosts = async () => {
            const response =  await GET('http://localhost:3000/api/post');
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setPosts(data);
            } else {
                setError('Une erreur a été rencontré lors de la récupération des posts') //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadPosts();
        setIsLoaded(false);
    }, [])
    
    const renderPost = (post) => {
        console.log(post)
        return <li key={post.id} className="Post">
            <div className='Identification'>
                <div className='DivProfil'>
                    <img src={post.photoProfil} className='PhotoProfil' alt='photoProfil' />
                </div>
                <div>
                    {post.nom} <br/>
                    {post.dateDePublication}
                </div>
                <div className='DivPhoto'>
                    <img src={post.imagePublication} className="ImgPost" alt='photoPost' />
                </div>
                <div>
                    {post.descriptionPublication}
                </div>
                <Button type='button' text="J'aime" />
                <Button type='button' className='Bouton-link__GreyButton' text="Je n'aime pas" />
            </div>
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