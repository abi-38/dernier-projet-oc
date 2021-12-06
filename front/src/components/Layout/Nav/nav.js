import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import AuthContext from '../../../context/Auth-context';

const Nav = () => {  
    const ctx = useContext(AuthContext);

    return (
        <>
            <MDBDropdownToggle tag='a'>
                <FontAwesomeIcon icon={faBars} />
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                {!ctx.isLogin() && 
                <MDBDropdownItem>
                    <MDBDropdownLink tag='button' type='button'><Link to="/">Se connecter</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {!ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink tag='button' type='button'><Link to="/sinscrire">S'inscrire</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink tag='button' type='button'><Link to="/home">Home</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink tag='button' type='button'><Link to="/account">Mon compte</Link></MDBDropdownLink>
                </MDBDropdownItem>}
                {ctx.isLogin() &&
                <MDBDropdownItem>
                    <MDBDropdownLink><button onClick={ctx.onLogout}>Se déconnecter</button></MDBDropdownLink>
                </MDBDropdownItem>}
            </MDBDropdownMenu>
        </>
    );
}

export default Nav;