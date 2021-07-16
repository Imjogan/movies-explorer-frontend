import './NavAuth.css';
import { Link } from 'react-router-dom';
import BurgerButton from '../BurgerButton/BurgerButton';

const NavAuth = ({ isLoggedIn, openSideMenu }) => {
  return (
    <section className="nav-auth">
      <nav className={`nav-auth__routes ${isLoggedIn && 'nav-auth__routes_none'}`}>
        <Link
          to="/signup"
          className="nav-auth__link nav-auth__link_type_registration"
        >
          Регистрация
        </Link>
        <Link
          to="/signin"
          className="nav-auth__link nav-auth__link_type_login"
        >
          Войти
        </Link>
      </nav>
      <nav className={`nav-auth__routes ${!isLoggedIn && 'nav-auth__routes_none'}`}>
        <Link
          to="/profile"
          className="nav-auth__link nav-auth__link_type_account"
        >
          Аккаунт
        </Link>
      </nav>
      <BurgerButton openSideMenu={openSideMenu} />
    </section>
  );
};

export default NavAuth;
