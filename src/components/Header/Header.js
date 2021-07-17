import './Header.css';
import headerLogo from '../../images/header/logo.svg';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import BurgerButton from '../BurgerButton/BurgerButton';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, openSideMenu, isTablet }) => {
  return (
    <header className="header">
      <div className="header__logo-wrapper">
        <Link to="/">
          <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
        </Link>
      </div>
      {isLoggedIn && !isTablet && <Navigation />}
      <nav className="header__menu">
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="header__link"
          >
            Регистрация
          </Link>
        )}
        {!isLoggedIn ? (
          <Button type={'login'} text={'Войти'} />
        ) : (
          !isTablet && <Button type={'account'} text={'Аккаунт'} />
        )}
        {isTablet && isLoggedIn && <BurgerButton openSideMenu={openSideMenu} />}
      </nav>
    </header>
  );
};

export default Header;
