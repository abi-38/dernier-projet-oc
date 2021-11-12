import React from 'react';
import NewPost from './Posts/NewPost';
import Post from './Posts/Post';
// fonction de rappel à passer au composant NewPost

const Home = () => {
    return (
        <>
        <div className='PostStyle'>
            <NewPost/>
        </div>
        <div className='PostStyle__Posts'>
            <Post/>
        </div>
        </>
    );
}

export default Home;