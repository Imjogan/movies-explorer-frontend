import './Register.css';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField, validators } from '../../utils/utils';
import mainApi from '../../utils/MainApi';
import {
  minInputLength,
  minInputPasswordLength,
  maxInputLength,
} from '../../utils/constants';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Register = ({ setTooltipState, handleLogin, setIsLoaderVisible }) => {
  // стейт блокировки submit-а
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  // стейт состояния выполнения submit-а
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  // стейт значений инпутов
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  // обнуляем инпуты при обновлении компонента
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
  // состояние ошибок в инпутах
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
      maxLength: true,
      validСharacters: true,
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
  // обработчик submit-а
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsLoaderVisible(true);
    setIsSubmittingRegister(true);
    mainApi
      .register(formValues.name, formValues.email, formValues.password)
      .then((res) => {
        // если регистрация успешная - сразу авторизовываем пользователя
        if (!res.error) {
          mainApi
            .authorize(formValues.password, formValues.email)
            .then((data) => {
              if (data.token) {
                localStorage.setItem('token', data.token);
                handleLogin();
              }
            })
            .catch(() =>
              setTooltipState({
                tooltipVisible: true,
                isSuccessful: false,
                text: 'При авторизации произошла ошибка, попробуйте еще раз!',
              })
            );
          setTooltipState({
            tooltipVisible: true,
            isSuccessful: true,
            text: 'Вы успешно зарегистрированы!',
          });
        } else {
          setTooltipState({
            tooltipVisible: true,
            isSuccessful: false,
            text: 'При регистрации произошла ошибка, попробуйте еще раз.',
          });
        }
      })
      .catch((res) => {
        console.log(res);
      })
      .finally(() => {
        setIsDisabledDefault(true);
        setIsLoaderVisible(false);
        setIsSubmittingRegister(false);
      });
  };
  // обработчик изменения инпутов
  const handleInputChange = useCallback(
    (evt) => {
      setIsDisabledDefault(false);
      const { name, value } = evt.target;
      setFormValues((state) => ({ ...state, [name]: value }));
    },
    [setFormValues]
  );
  // валидация инпутов при обновлении значений
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
  // вытаскиваем значения инпутов
  const { name, email, password } = formValues;
  // проверяем валидность инпутов
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  // submit доступен при выполнении всех условий
  const isSubmitDisabled = isNameInvalid || isEmailInvalid || isPasswordInvalid;
  const isAnyParamsNameValid =
    errors.name.required ||
    errors.name.minLength ||
    errors.name.maxLength ||
    errors.name.validСharacters;
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
                    : errors.name.validСharacters
                    ? 'Введены недопустимые символы'
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
