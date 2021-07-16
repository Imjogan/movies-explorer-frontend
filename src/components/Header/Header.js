import './Header.css';
import headerLogo from '../../images/header/logo.svg';
import Navigation from '../Navigation/Navigation';
import NavAuth from '../NavAuth/NavAuth';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, openSideMenu }) => {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </Link>
      <nav className="header__menu">
        {isLoggedIn && <Navigation />}
        <NavAuth isLoggedIn={isLoggedIn} openSideMenu={openSideMenu} />
      </nav>
    </header>
  );
};

export default Header;