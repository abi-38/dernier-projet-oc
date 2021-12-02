import { useState, useEffect } from 'react';
import { GET, POST, DELETE } from '../../../../assets/api/confAxios';
import CreatePost from './CreatePost';
import Post from './Post';

const Posts = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try { 
                const response =  await GET('/api/post');
                const data = response.data;
                setPosts(data);
                console.log('Chargement des posts réussis !');
                console.log(data);
            } catch (e) {
                setError(e.response.data.error); 
            }
            
        }
        setIsLoaded(true)
        loadPosts();
        console.log(isLoaded);
    }, [])

    const handlerCreatePost = async (formData) => {
        try {
            const response = await POST( '/api/post', formData)
            console.log('Post bien créé !');
            const {data} = response; 
            console.log(data);
            setPosts(previousPosts => [
                data,
                ...previousPosts
             ])
        } catch (e) {
            setError(e.response.data.error);
        }
	};

    const handlerDeletePostButton = async (id) => {
        try {
            const response = await DELETE( '/api/post/' + id)
            console.log('Post bien supprimé !' + response);
            setPosts(posts.filter( actualPost => actualPost.id !== id ));
        } catch (e) {
            setError(e.response.data.error);
            console.log(error)
        }
    }

    return (
        <>
        <div className='PostStyle'>
            <CreatePost onAddPostHandler={handlerCreatePost}/>
        </div>
        <div className='PostStyle PostStyle__Posts'>
            
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