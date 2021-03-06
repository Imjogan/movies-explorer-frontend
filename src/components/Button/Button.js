import './Button.css';
import { Link } from 'react-router-dom';

const Button = ({
  text,
  type,
  onClick,
  disabled,
  buttonType,
  closeSideMenu,
  additionalClass,
}) => {
  return (
    <>
      {type === 'login' ? (
        <Link className="button button_type_login" to="/signin">
          {text}
        </Link>
      ) : type === 'account' ? (
        <Link
          onClick={closeSideMenu}
          className="button button_type_account"
          to="/profile"
        >
          {text}
        </Link>
      ) : (
        <button
          className={`
      button
      ${type === 'save' && `button_type_save ${additionalClass}`}
      ${type === 'saved' && 'button_type_saved'}
      ${type === 'delete' && `button_type_delete ${additionalClass}`}
      ${type === 'more' && 'button_type_more'}
      ${type === 'search' && `button_type_search ${additionalClass}`}
      ${type === 'edit' && `button_type_edit ${additionalClass}`}
      ${type === 'logout' && 'button_type_logout'}
      ${type === 'register' && `button_type_register ${additionalClass}`}
      ${type === 'login-form' && `button_type_login-form ${additionalClass}`}
      ${type === 'close' && `button_type_close ${additionalClass}`}
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
