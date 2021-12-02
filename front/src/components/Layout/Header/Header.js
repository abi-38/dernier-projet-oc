import DropDownList from '../Nav/DropDownList';
import logo from '../../../assets/img/Logo.png'
import './Header.scss';
import '../Nav/DropDownList.scss';

const Header = () => {
    return (
        <header className="App-header">
            <img src={logo} className='App-header__Logo' alt='logo' />
            <DropDownList/>
        </header>
    )
}

export default Header;