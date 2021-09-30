import NotFound from "../Sinscrire/NotFound";
import Home from "../pages/Home";

const MenuConnected = [
    {path : '/', component: <Home/>, exact: true },
    {path : '*', component: <NotFound/> }
];

export default MenuConnected;