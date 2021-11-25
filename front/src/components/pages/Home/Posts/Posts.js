import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { GET, POST, DELETE } from '../../../../assets/api/confAxios';
//const GET = require('../api/confAxios'); -> interdit + ne pas mettre le require avant import
import CreatePost from './CreatePost';
import Post from './Post';

const Posts = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            const response =  await GET('/api/post');
            const data = response.data;
            if (response.status === 200) { //Base sur le code de status du retour de l'api
                setPosts(data);
                console.log('Chargement des posts réussis !');
            } else {
                setError('Une erreur a été rencontré lors de la récupération des post'); //Ou message d'erreur provenant de l'api
            }
            
        }
        setIsLoaded(true)
        loadPosts();
    }, [])

    const submitHandler = async (formData) => {
        try {
        const response = await POST( '/api/post', formData)
        console.log('Post bien créé !');
        const {data} = response; 
        setPosts(posts.pop( data ));
        //cleanForm()
        } catch (e) {
            console.log(error);
            setError(e.response.data.error);
        }
	};

    const handlerDeletePostButton = async (id) => {
        try {
            const response = await DELETE( '/api/post/' + id)
            console.log('Post bien supprimé !');
            setPosts(posts.filter( actualPost => actualPost.id != id ));
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return (
        <>
        <div className='PostStyle'>
            <CreatePost onSubmit={submitHandler}/>
        </div>
        <div className='PostStyle PostStyle__Posts'>
            {error && <div>{error}</div>}
            <ul>
                {posts.map(post => {
                    return <Post post={post} onClick={handlerDeletePostButton} />;
                })}
            </ul>
        </div>
        </>
    )
}

export default Posts;