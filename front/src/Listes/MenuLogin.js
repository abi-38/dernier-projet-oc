import SeConnecter from "../Sinscrire/SeConnecter";
import Sinscrire from "../Sinscrire/Sinscrire";
import NotFound from "../Sinscrire/NotFound";

const MenuLogin = [
    {path : '/sinscrire', component: <Sinscrire/>, exact: true },
    {path : '/', component: <SeConnecter/>, exact: true },
    {path : '*', component: <NotFound/> }
];

export default MenuLogin;