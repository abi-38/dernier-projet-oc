import NotFound from "../../components/pages/NotFound/NotFound";
import Home from "../../components/pages/Home/Home";

const MenuConnected = [
    {path : '/', component: <Home/>, exact: true },
    {path : '*', component: <NotFound/> }
];

export default MenuConnected;