import './Profile.css';
import Header from '../Header/Header';
import Button from '../Button/Button';
import { useState, useEffect, useCallback } from 'react';
import { validateField, validators } from '../../utils/utils';
import { minInputLength } from '../../utils/constants';
import mainApi from '../../utils/MainApi';
import { useHistory } from 'react-router';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({
  isTablet,
  isLoggedIn,
  openSideMenu,
  setIsLoggedIn,
  setCurrentUser,
  setTooltipState,
  setIsLoaderVisible,
}) => {
  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  // стейт блокировки submit-а
  const [isDisabledDefault, setIsDisabledDefault] = useState(true);
  // стейт состояния выполнения submit-а
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  // стейт значений инпутов
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (currentUser.name !== undefined && currentUser.email !== undefined) {
      setFormValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser]);
  // стейт показывает, новые ли данные введены в поля
  const [isNewData, setIsNewData] = useState(false);
  // если данные старие - блокируем submit
  useEffect(() => {
    if (
      formValues.name === currentUser?.name &&
      formValues.email === currentUser?.email
    ) {
      setIsNewData(false);
    } else {
      setIsNewData(true);
    }
  }, [formValues, currentUser]);
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
    setIsLoaderVisible(true);
    setIsSubmittingProfile(true);
    mainApi
      .setUserInfo(formValues.name, formValues.email)
      .then((res) => {
        setCurrentUser(res);
        setTooltipState({
          tooltipVisible: true,
          isSuccessful: true,
          text: 'Изменения приняты!',
        });
      })
      .catch(() => {
        setTooltipState({
          tooltipVisible: true,
          isSuccessful: false,
          text: 'Что-то пошло не так...',
        });
      })
      .finally(() => {
        setIsLoaderVisible(false);
        setIsDisabledDefault(true);
        setIsSubmittingProfile(false);
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
    isDisabledDefault || isSubmitDisabled || isSubmittingProfile || !isNewData;

  // выход из аккаунта
  const onSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    mainApi.currentToken = '';
    history.push('/');
  };

  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <section className="profile">
        <h3 className="profile__greeting">{`Привет, ${currentUser?.name}!`}</h3>
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
                  disabled
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
        <Button
          onClick={onSignOut}
          text={'Выйти из аккаунта'}
          type={'logout'}
        />
      </section>
    </>
  );
};

export default Profile;
