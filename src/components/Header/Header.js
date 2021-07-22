import './Header.css';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import BurgerButton from '../BurgerButton/BurgerButton';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, openSideMenu, isTablet, theme }) => {
  return (
    <header className={`header ${theme === 'white' && 'header_theme_white'}`}>
      <div className="header__logo-wrapper">
        <Logo />
      </div>
      {isLoggedIn && !isTablet && <Navigation />}
      <nav className="header__menu">
        {!isLoggedIn && (
          <Link to="/signup" className="header__link">
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
