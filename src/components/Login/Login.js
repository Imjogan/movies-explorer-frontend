import './Login.css';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField } from '../../utils/utils';
import { minInputLength, minInputPasswordLength } from '../../utils/constants';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const validators = {
  email: {
    required: (value) => value === '',
    email: (value) =>
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ),
  },
  password: {
    required: (value) => value === '',
    minLength: (value) => value.length < minInputPasswordLength,
  },
};

const Login = () => {
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setIsDisabledDefault(true);
    return () => {
      setFormValues({
        email: '',
        password: '',
      });
    };
  }, []);

  const [errors, setErrors] = useState({
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minLength: true,
    },
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleInputChange = useCallback(
    (evt) => {
      setIsDisabledDefault(false);
      const { name, value } = evt.target;
      setFormValues((state) => ({ ...state, [name]: value }));
    },
    [setFormValues]
  );

  useEffect(
    function validateInputs() {
      const { email, password } = formValues;
      const emailValidationResult = validateField(validators.email, email);
      const passwordValidationResult = validateField(
        validators.password,
        password
      );
      setErrors({
        email: emailValidationResult,
        password: passwordValidationResult,
      });
    },
    [formValues, setErrors]
  );

  const { email, password } = formValues;
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isEmailInvalid || isPasswordInvalid;

  const isAnyParamsEmailValid = errors.email.required || errors.email.email;
  const isAnyParamsPasswordValid =
    errors.password.required || errors.password.minLength;

  const isDisabled = isDisabledDefault || isSubmitDisabled || isSubmittingLogin;

  return (
    <section className="login">
      <div className="login__logo-wrapper">
        <Logo />
      </div>
      <h3 className="login__greeting">Рады видеть!</h3>
      <form
        onSubmit={handleSubmit}
        noValidate
        name="login"
        className="login__form"
      >
        <fieldset className="login__form-fields">
          <div className="login__container">
            <p className="login__input-caption">E-mail</p>
            <label className="login__label">
              <input
                type="email"
                placeholder="Укажите e-mail адрес"
                className={`login__form-input ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'login__form-input_type_error'
                }`}
                name="email"
                required
                id="email-input"
                value={email}
                onChange={handleInputChange}
              />
              <span
                className={`login__form-error ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'login__form-error_visible'
                }`}
              >
                {isAnyParamsEmailValid
                  ? errors.email.required
                    ? 'Поле обязательно для заполнения'
                    : 'Введите Email-адрес'
                  : ''}
              </span>
            </label>
          </div>
          <div className="login__container">
            <p className="login__input-caption">Пароль</p>
            <label className="login__label">
              <input
                type="password"
                placeholder="Введите пароль"
                className={`login__form-input ${
                  isDisabledDefault
                    ? ''
                    : isPasswordInvalid && 'login__form-input_type_error'
                }`}
                name="password"
                required
                id="password-input"
                value={password}
                onChange={handleInputChange}
              />
              <span
                className={`login__form-error ${
                  isDisabledDefault
                    ? ''
                    : isPasswordInvalid && 'login__form-error_visible'
                }`}
              >
                {isAnyParamsPasswordValid
                  ? errors.password.required
                    ? 'Поле обязательно для заполнения'
                    : `Введите пароль не короче ${minInputPasswordLength} символов`
                  : ''}
              </span>
            </label>
          </div>
        </fieldset>
        <Button
          additionalClass={isDisabled && 'button_disabled'}
          text={isSubmittingLogin ? 'Вход...' : 'Войти'}
          type={'login-form'}
          buttonType="submit"
        />
      </form>
      <div className="login__not-registered-yet">
        <p className="login__register-text">Еще не зарегистрированы?</p>
        <Link className="login__register" to="/signup">
          Регистрация
        </Link>
      </div>
    </section>
  );
};

export default Login;
