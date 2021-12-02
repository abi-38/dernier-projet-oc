import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import Posts from './Posts/Posts';
import AuthContext from '../../../context/Auth-context';

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