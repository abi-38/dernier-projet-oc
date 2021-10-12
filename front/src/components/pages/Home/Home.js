import React from 'react';
import NewPost from './Posts/NewPost';
import Post from './Posts/Post';

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