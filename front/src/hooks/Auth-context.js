import React, {useState, useEffect} from 'react';
import { useHistory, Redirect } from "react-router-dom";

const AuthContext = React.createContext({
    token: null,
    onLogout: () => {},
    onLogin: (token) => {},
    isLogin: () => {},
})

export const AuthContextPorvider = (props) => {
    const [token, setToken] = useState(null);
    const history = useHistory();

    useEffect( () => {
        const storedToken = localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : null;
        if (storedToken) {
            setToken(storedToken); 
        }
    }, [])

    const logoutHandler = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    const loginHandler = (token) => {
        setToken(token.token); 
        localStorage.setItem('token', token.token);
    }

    const isLogin = () => {
        return token; 
    }

    return (
        <AuthContext.Provider
                value={{
                    token: token,
                    onLogout: logoutHandler,
                    onLogin: loginHandler,
                    isLogin: isLogin
                }}
            >
                {props.children}
        </AuthContext.Provider>
    )
    
}

export default AuthContext;