import './Profile.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField, validators } from '../../utils/utils';
import { minInputLength } from '../../utils/constants';

const Profile = ({ isTablet, isLoggedIn, openSideMenu }) => {
  // стейт блокировки submit-а
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  // стейт состояния выполнения submit-а
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  // стейт значений инпутов
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });
  // обнуляем инпуты при обновлении компонента
  useEffect(() => {
    setIsDisabledDefault(true);
    return () => {
      setFormValues({
        name: '',
        email: '',
      });
    };
  }, []);
  // состояние ошибок в инпутах
  const [errors, setErrors] = useState({
    name: {
      required: true,
      minLength: true,
    },
    email: {
      required: true,
      email: true,
    },
  });
  // обработчик submit-а
  const handleSubmit = (evt) => {
    evt.preventDefault();
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
      const { name, email } = formValues;
      const nameValidationResult = validateField(validators.name, name);
      const emailValidationResult = validateField(validators.email, email);
      setErrors({
        name: nameValidationResult,
        email: emailValidationResult,
      });
    },
    [formValues, setErrors]
  );
  // вытаскиваем значения инпутов
  const { name, email } = formValues;
  // проверяем валидность инпутов
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  // submit доступен при выполнении всех условий
  const isSubmitDisabled = isNameInvalid || isEmailInvalid;
  const isAnyParamsNameValid = errors.name.required || errors.name.minLength;
  const isAnyParamsEmailValid = errors.email.required || errors.email.email;

  const isDisabled =
    isDisabledDefault || isSubmitDisabled || isSubmittingProfile;

  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <section className="profile">
        <h3 className="profile__greeting">{`Привет, Иван!`}</h3>
        <form
          onSubmit={handleSubmit}
          noValidate
          name="profile"
          className="profile__form"
        >
          <fieldset className="profile__form-fields">
            <div className="profile__container">
              <p className="profile__input-caption">Имя</p>
              <label className="profile__label">
                <input
                  type="text"
                  placeholder="Введите имя"
                  className={`profile__form-input ${
                    isDisabledDefault
                      ? ''
                      : isNameInvalid && 'profile__form-input_type_error'
                  }`}
                  name="name"
                  required
                  minLength={minInputLength}
                  id="name-input"
                  value={name}
                  onChange={handleInputChange}
                />
                <span
                  className={`profile__form-error ${
                    isDisabledDefault
                      ? ''
                      : isNameInvalid && 'profile__form-error_visible'
                  }`}
                >
                  {isAnyParamsNameValid
                    ? errors.name.required
                      ? 'Поле обязательно для заполнения'
                      : `Введите имя не короче ${minInputLength} символов`
                    : ''}
                </span>
              </label>
            </div>
            <div className="profile__container">
              <p className="profile__input-caption">E-mail</p>
              <label className="profile__label">
                <input
                  type="email"
                  placeholder="Email"
                  className={`profile__form-input ${
                    isDisabledDefault
                      ? ''
                      : isEmailInvalid && 'profile__form-input_type_error'
                  }`}
                  name="email"
                  required
                  id="email-input"
                  value={email}
                  onChange={handleInputChange}
                />
                <span
                  className={`profile__form-error ${
                    isDisabledDefault
                      ? ''
                      : isEmailInvalid && 'profile__form-error_visible'
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
          </fieldset>
          <Button
            additionalClass={isDisabled && 'button_disabled'}
            text={isSubmittingProfile ? 'Сохранение...' : 'Редактировать'}
            type={'edit'}
            buttonType="submit"
          />
        </form>
        <Button text={'Выйти из аккаунта'} type={'logout'} />
      </section>
    </>
  );
};

export default Profile;
