import React, { useContext } from 'react';
import CreatePost from './Posts/CreatePost';
import Post from './Posts/Post';
// fonction de rappel à passer au composant NewPost
import AuthContext from '../../../hooks/Auth-context';
import { Redirect } from "react-router-dom";

const Home = () => {
    const ctx = useContext(AuthContext);

    if(!ctx.isLogin()) {
        return <Redirect push to="/" />
    }

    return (
        <Post/>
    );
}

export default Home;