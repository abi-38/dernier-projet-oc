import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    onLogin: (token) => {},
    token: null,
    saveAdmin: (user) => {},
    user: null,
    isLogin: () => {},
    onLogout: () => {},
})

export const AuthContextPorvider = (props) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    useEffect( () => {
        const storedToken = localStorage.hasOwnProperty('token') ? localStorage.getItem('token') : null;
        const storedUser = localStorage.hasOwnProperty('user') ? localStorage.getItem('user') : null;

        if (storedToken) {
            setToken(storedToken); 
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, [])

    const loginHandler = (token) => {
        setToken(token.token); 
        console.log(token);
        localStorage.setItem('token', token.token);
    }

    const adminHandler = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const isLogin = () => {
        return token && user;
    }

    const logoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
    }

    return (
        <AuthContext.Provider
                value={{
                    onLogin: loginHandler,
                    token: token,
                    saveAdmin: adminHandler,
                    user: user,
                    isLogin: isLogin,
                    onLogout: logoutHandler
                }}
            >
                {props.children}
        </AuthContext.Provider>
    )
    
}

export default AuthContext;