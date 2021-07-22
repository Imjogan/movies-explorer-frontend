import './Logo.css';
import headerLogo from '../../images/header/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className="logo" to="/">
      <img className="logo__image" src={headerLogo} alt="Логотип сайта" />
    </Link>
  );
};

export default Logo;
