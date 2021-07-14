import './Button.css';

const Button = ({ type, name, buttonStyle }) => {
  return (
    <button type={type} className={`button button_type_${buttonStyle}`}>
      {name}
    </button>
  );
};

export default Button;
