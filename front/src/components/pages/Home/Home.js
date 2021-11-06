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
//<Post/> -> remettre ce composant que les autres pbs seront réglé