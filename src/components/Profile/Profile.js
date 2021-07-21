import './Profile.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField } from '../../utils/utils';
import { minInputLength } from '../../utils/constants';

const validators = {
  name: {
    required: (value) => value === '',
    minLength: (value) => value.length < minInputLength,
  },
  email: {
    required: (value) => value === '',
    email: (value) =>
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ),
  },
};

const Profile = ({ isTablet, isLoggedIn, openSideMenu }) => {
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    setIsDisabledDefault(true);
    return () => {
      setFormValues({
        name: '',
        email: '',
      });
    };
  }, []);

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

  const { name, email } = formValues;
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid;

  const isAnyParamsNameValid = errors.name.required || errors.name.minLength;
  const isAnyParamsEmailValid = errors.email.required || errors.email.email;

  const isDisabled =
    isDisabledDefault || isSubmitDisabled || isSubmittingProfile;

  return (
    <section className="profile">
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <h3 className="profile__greeting">{`Привет, Иван!`}</h3>
      <form
        onSubmit={handleSubmit}
        noValidate
        name="profile"
        className="profile__form"
      >
        <fieldset className="form__fields">
          <div className="profile__container">
            <p className="profile__input-caption">Имя</p>
            <label className="label">
              <input
                type="text"
                placeholder="Введите имя"
                className={`form__input ${
                  isDisabledDefault
                    ? ''
                    : isNameInvalid && 'form__input_type_error'
                }`}
                name="name"
                required
                minLength={minInputLength}
                id="name-input"
                value={name}
                onChange={handleInputChange}
              />
              <span
                className={`form__error ${
                  isDisabledDefault
                    ? ''
                    : isNameInvalid && 'form__error_visible'
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
            <label className="label">
              <input
                type="email"
                placeholder="Email"
                className={`form__input ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'form__input_type_error'
                }`}
                name="email"
                required
                id="email-input"
                value={email}
                onChange={handleInputChange}
              />
              <span
                className={`form__error ${
                  isDisabledDefault
                    ? ''
                    : isEmailInvalid && 'form__error_visible'
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
      <Button
        text={'Выйти из аккаунта'}
        type={'logout'}
      />
    </section>
  );
};

export default Profile;
