import './Header.css';
import Button from '../Button/Button';
import headerLogo from '../../images/header/logo.svg';

const Header = () => {
  return (
    <section className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      <nav className="header__menu">
        <Button type={'button'} name={'Регистрация'} buttonStyle={'default'} />
        <Button type={'button'} name={'Войти'} buttonStyle={'blue'} />
      </nav>
    </section>
  );
};

export default Header;
