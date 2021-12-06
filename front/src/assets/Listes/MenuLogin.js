import SignUp from "../../components/pages/LoginPage/signUp/SignUp";
import NotFound from "../../components/pages/NotFound/NotFound";
import Home from '../../components/pages/Home/Home';
import Login from "../../components/pages/LoginPage/Login/Login";
import Account from "../../components/pages/Account/Account";

const MenuLogin = [
    {path : '/sinscrire', component: <SignUp/>, exact: true },
    {path : '/', component: <Login/>, exact: true },
    {path : '/home', component: <Home/>, exact: true },
    {path : '/account', component: <Account/>, exact: true },
    {path : '*', component: <NotFound/> }
];

export default MenuLogin;