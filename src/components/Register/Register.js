import './Register.css';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField } from '../../utils/utils';
import {
  minInputLength,
  minInputPasswordLength,
  maxInputLength,
} from '../../utils/constants';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const validators = {
  name: {
    required: (value) => value === '',
    minLength: (value) => value.length < minInputLength,
    maxLength: (value) => value.length > maxInputLength,
  },
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

const Register = () => {
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setIsDisabledDefault(true);
    return () => {
      setFormValues({
        name: '',
        email: '',
        password: '',
      });
    };
  }, []);

  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      maxLength: true,
    },
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
      const { name, email, password } = formValues;
      const nameValidationResult = validateField(validators.name, name);
      const emailValidationResult = validateField(validators.email, email);
      const passwordValidationResult = validateField(
        validators.password,
        password
      );
      setErrors({
        name: nameValidationResult,
        email: emailValidationResult,
        password: passwordValidationResult,
      });
    },
    [formValues, setErrors]
  );

  const { name, email, password } = formValues;
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid || isPasswordInvalid;

  const isAnyParamsNameValid =
    errors.name.required || errors.name.minLength || errors.name.maxLength;
  const isAnyParamsEmailValid = errors.email.required || errors.email.email;
  const isAnyParamsPasswordValid =
    errors.password.required || errors.password.minLength;

  const isDisabled =
    isDisabledDefault || isSubmitDisabled || isSubmittingRegister;

  return (
    <section className="register">
      <div className="register__logo-wrapper">
        <Logo />
      </div>
      <h3 className="register__greeting">Добро пожаловать!</h3>
      <form
        onSubmit={handleSubmit}
        noValidate
        name="register"
        className="register__form"
      >
        <fieldset className="register__form-fields">
          <div className="register__container">
            <p className="register__input-caption">Имя</p>
            <label className="register__label">
              <input
                type="text"
                placeholder="Введите имя"
                className={`register__form-input ${
                  isDisabledDefault
                    ? ''
                    : isNameInvalid && 'register__form-input_type_error'
                }`}
                name="name"
                required
                minLength={minInputLength}
                id="name-input"
                value={name}
                onChange={handleInputChange}
              />
              <span
                className={`register__form-error ${
                  isDisabledDefault
                    ? ''
                    : isNameInvalid && 'register__form-error_visible'
                }`}
              >
                {isAnyParamsNameValid
                  ? errors.name.required
                    ? 'Поле обязательно для заполнения'
                    : errors.name.minLength
                    ? `Введите имя не короче ${minInputLength} символов`
                    : errors.name.maxLength &&
                      `Превышел лимит в ${maxInputLength} символов`
                  : ''}
              </span>
            </label>
          </div>
          <div className="register__container">
            <p className="register__input-caption">E-mail</p>
            <label className="register__label">
              <input
                type="email"
                placeholder="Укажите e-mail адрес"
                className={`register__form-input ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'register__form-input_type_error'
                }`}
                name="email"
                required
                id="email-input"
                value={email}
                onChange={handleInputChange}
              />
              <span
                className={`register__form-error ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'register__form-error_visible'
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
          <div className="register__container">
            <p className="register__input-caption">Пароль</p>
            <label className="register__label">
              <input
                type="password"
                placeholder="Введите пароль"
                className={`register__form-input ${
                  isDisabledDefault
                    ? ''
                    : isPasswordInvalid && 'register__form-input_type_error'
                }`}
                name="password"
                required
                id="password-input"
                value={password}
                onChange={handleInputChange}
              />
              <span
                className={`register__form-error ${
                  isDisabledDefault
                    ? ''
                    : isPasswordInvalid && 'register__form-error_visible'
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
          text={isSubmittingRegister ? 'Регистрация...' : 'Зарегистрироваться'}
          type={'register'}
          buttonType="submit"
        />
      </form>
      <div className="register__already-registered">
        <p className="register__login-text">Уже зарегистрированы?</p>
        <Link className="register__login" to="/signin">
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
