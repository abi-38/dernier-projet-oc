import { useState, useEffect } from 'react';
import { GET, POST, DELETE } from '../../../../assets/api/confAxios';
import CreatePost from './CreatePost';
import Post from './Post';

const Posts = () => {
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadPosts = async () => {
            try { 
                const response =  await GET('/api/post');
                const data = response.data;
                setPosts(data);
                console.log('Chargement des posts réussis !');
            } catch (e) {
                setError(e.response.data.error); 
            }
            
        }
        loadPosts();
    }, [])

    const handlerCreatePost = async (formData) => {
        try {
            await POST( '/api/post', formData)
            const response = await GET('/api/post');
            const data = response.data;
            setPosts(data);
            console.log('Post bien créé !');
            
        } catch (e) {
            setError(e.response.data.error);
        }
	};

    const handlerDeletePostButton = async (id) => {
        try {
            await DELETE( '/api/post/' + id);
            setPosts(posts.filter( actualPost => actualPost.id !== id ));
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    return (
        <>
        <div className='PostStyle'>
            {error && <div>{error}</div>}
            <CreatePost onAddPostHandler={handlerCreatePost}/>
        </div>
        <div className='PostStyle PostStyle__Posts'>
            
            <ul>
                {posts.map(post => {
                    return <Post post={post} key={post.id} onClick={handlerDeletePostButton} />;
                })}
            </ul>
        </div>
        </>
    )
}

export default Posts;