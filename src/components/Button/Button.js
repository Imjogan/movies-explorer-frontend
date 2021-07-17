import './Button.css';
import { Link } from 'react-router-dom';

const Button = ({ text, type, onClick, disabled, buttonType, closeSideMenu }) => {
  return (
    <>
      {type === 'login' ? (
        <Link className="button button_type_login" to="/signin">
          {text}
        </Link>
      ) : type === 'account' ? (
        <Link onClick={closeSideMenu} className="button button_type_account" to="/profile">
          {text}
        </Link>
      ) : (
        <button
          className={`
      button
      ${type === 'login' && 'button_type_login'}
      ${type === 'account' && 'button_type_account'}
      `}
          type={buttonType || 'button'}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
