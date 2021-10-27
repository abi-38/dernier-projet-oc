import SignIn from "../../components/pages/LoginPage/SignIn";
import SignUp from "../../components/pages/LoginPage/SignUp";
import NotFound from "../../components/pages/NotFound/NotFound";
import Home from '../../components/pages/Home/Home'

const MenuLogin = [
    {path : '/sinscrire', component: <SignUp/>, exact: true },
    {path : '/', component: <SignIn/>, exact: true },
    {path : '/home', component: <Home/>, exact: true },
    {path : '*', component: <NotFound/> }
];

export default MenuLogin;