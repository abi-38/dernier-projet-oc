import React from 'react';
import NewPost from '../Reusable/NewPost';
import Post from '../Reusable/Post';

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