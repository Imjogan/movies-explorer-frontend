import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import SideMenu from '../SideMenu/SideMenu';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

const App = () => {
  const history = useHistory();
  // проверяем токен при обновлении
  useEffect(() => {
    handleTokenCheck();
  }, []);
  //определяем устройство
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  // стейт сохраненных фильмов пользователя
  const [savedMovies, setSavedMovies] = useState([]);
  // стейт пользователя
  const [currentUser, setCurrentUser] = useState({});
  // состояние попапа информации и текст
  const [tooltipState, setTooltipState] = useState({
    tooltipVisible: false,
    isSuccessful: false,
    text: '',
  });
  // стейт найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]);
  // состояние лоадера
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  // состояние чекбокса короткометражки
  const [isShortChecked, setIsShortChecked] = useState(false);
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') || false
  );
  // состояние side-меню
  const [isSideMenu, setIsSideMenu] = useState(false);
  // ф-я закрытия меню
  const closeSideMenu = () => {
    setIsSideMenu(false);
    document.removeEventListener('keydown', handleEscClick);
  };
  // ф-я открытия side-меню
  const openSideMenu = () => {
    setIsSideMenu(true);
    document.addEventListener('keydown', handleEscClick);
  };
  // ф-я закрытия side-меню по Esc
  const handleEscClick = (evt) => {
    if (evt.key === 'Escape') {
      closeSideMenu();
    }
  };
  // закрываем side-меню, если разрешение больше планшетного
  useEffect(() => {
    if (!isTablet) {
      setIsSideMenu(false);
    }
  }, [isTablet]);

  // получаем фильмы
  const getCurrentMovies = useCallback(
    (movies) => {
      setFoundMovies(movies);
    },
    [setFoundMovies]
  );
  // проверка токена
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      mainApi.currentToken = token;
      // проверяем токен и получаем информацию о пользователе
      mainApi
        .checkToken(token)
        .then((res) => {
          if (!res.message) {
            setIsLoaderVisible(true);
            // загружаем информацию о пользователе
            setCurrentUser(res);
            // получаем и загружаем информацию о фильмах
            mainApi
              .getMovies()
              .then((data) => {
                setSavedMovies(data.reverse());
              })
              .catch(() => {
                setTooltipState({
                  tooltipVisible: true,
                  isSuccessful: false,
                  text: 'Произошла ошибка при загрузке данных. Повторите попытку позже',
                });
              })
              .finally(() => {
                setIsLoaderVisible(false);
              });
            // проверяем, есть ли в хранилище фильмы
            if (localStorage.getItem('foundedMovies')) {
              setFoundMovies(
                JSON.parse(localStorage.getItem('foundedMovies') || '[]')
              );
            }
            setIsLoggedIn(true);
          }
        })
        .catch((res) => console.log(res));
    }
  };
  // авторизация
  const handleLogin = () => {
    handleTokenCheck();
    setIsLoggedIn(true);
    localStorage.setItem('loggedIn', true);
    history.push('/movies');
  };

  return (
    <section className="app">
      <Preloader isLoaderVisible={isLoaderVisible} />
      <SideMenu
        isLoggedIn={isLoggedIn}
        isSideMenu={isSideMenu}
        closeSideMenu={closeSideMenu}
      />
      <InfoTooltip
        tooltipState={tooltipState}
        setTooltipState={setTooltipState}
      />
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Main
              isTablet={isTablet}
              isLoggedIn={isLoggedIn}
              openSideMenu={openSideMenu}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isMobile={isMobile}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            isLoaderVisible={isLoaderVisible}
            isShortChecked={isShortChecked}
            openSideMenu={openSideMenu}
            setTooltipState={setTooltipState}
            setIsLoaderVisible={setIsLoaderVisible}
            setIsShortChecked={setIsShortChecked}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            setSavedMovies={setSavedMovies}
            setFoundMovies={setFoundMovies}
            getCurrentMovies={getCurrentMovies}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            isMobile={isMobile}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            isLoaderVisible={isLoaderVisible}
            isShortChecked={isShortChecked}
            openSideMenu={openSideMenu}
            setTooltipState={setTooltipState}
            setIsLoaderVisible={setIsLoaderVisible}
            setIsShortChecked={setIsShortChecked}
            savedMovies={savedMovies}
            foundMovies={foundMovies}
            setSavedMovies={setSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            openSideMenu={openSideMenu}
            setIsLoaderVisible={setIsLoaderVisible}
            setTooltipState={setTooltipState}
            setCurrentUser={setCurrentUser}
          />
          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                setIsLoaderVisible={setIsLoaderVisible}
                setTooltipState={setTooltipState}
                handleLogin={handleLogin}
              />
            )}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                setIsLoaderVisible={setIsLoaderVisible}
                setTooltipState={setTooltipState}
                handleLogin={handleLogin}
              />
            )}
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </section>
  );
};

export default App;
