import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { GET, DELETE } from '../../../../assets/api/confAxios';
//const GET = require('../api/confAxios'); -> interdit + ne pas mettre le require avant import
import Card from "../../../UI/card/Card";
import DayJS from 'react-dayjs';
import CreatePost from './CreatePost';
import DeletePost from './DeletePost';
import ModifiedPost from './ModifiedPost';

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
                //console.log(data);
                console.log('Chargement des posts réussis !');
            } else {
                setError('Une erreur a été rencontré lors de la récupération des posts'); //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadPosts();
    }, [])

    const handlerDeletePostButton = async (event) => {
        event.preventDefault();

        const response = await DELETE( '/api/post/' + posts.id)
        console.warn(posts.id);
        if(response.status === 200 ) {
            console.log('Post bien supprimé !');
            setPosts(posts);
        } else {
            setError('Une erreur a été rencontré lors de la suppression du post') //mettre message api
            console.log(error);
            setError(true)
        }
    }
    
    const renderPost = (posts) => {
        const postId = posts.id;
        return <li key={postId} className="Post">
            <Card className='Card'>
                <div>
                    {posts.user.name}
                </div>
                <div className='DivProfil'>
                    <img src={posts.user.imageUrl} className="ImgProfil" alt='photoPost' />
                </div>
                <div className="DatePost">                    
                    <p>Publié le : </p><DayJS format="DD-MM-YYYY" date={posts.createdAt}/>
                </div>
                <div className='DivPhoto'>
                    <img src={posts.imageUrl} className="ImgPost" alt='photoPost' />
                </div>
                <div>
                    {posts.title} <br/>
                    {posts.description}
                </div>
                <ModifiedPost postId={postId}/>
                <DeletePost postId={postId} onClick={handlerDeletePostButton} />
                
            </Card>
        </li>
    }

    return (
        <>
        <div className='PostStyle'>
            <CreatePost/>
        </div>
        <div className='PostStyle PostStyle__Posts'>
            <ul>
                {posts.map(post => {
                    return renderPost(post)
                })}
            </ul>
        </div>
        </>
    )
}

export default Post;