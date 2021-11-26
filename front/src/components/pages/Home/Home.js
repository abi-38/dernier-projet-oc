import React, { useContext } from 'react';
import Posts from './Posts/Posts';
// fonction de rappel à passer au composant NewPost
import AuthContext from '../../../context/Auth-context';
import { Redirect } from "react-router-dom";

const Home = () => {
    const ctx = useContext(AuthContext);

    if(!ctx.isLogin()) {
        return <Redirect push to="/" />
    }

    return (
        <Posts/>
    );
}

export default Home;