import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import SideMenu from '../SideMenu/SideMenu';
import Register from '../Register/Register';
import Login from '../Login/Login';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch, useHistory } from 'react-router-dom';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const App = () => {
  // проверяем токен при обновлении
  useEffect(() => {
    handleTokenCheck();
  }, []);
  // стейт сохраненных фильмов пользователя
  const [savedMovies, setSavedMovies] = useState([]);
  const history = useHistory();
  //определяем устройство
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  // стейт пользователя
  const [currentUser, setCurrentUser] = useState({});
  // состояние чекбокса короткометражки
  const [isShortChecked, setIsShortChecked] = useState(false);
  // состояние попапа информации и текст
  const [tooltipState, setTooltipState] = useState({
    tooltipVisible: false,
    isSuccessful: false,
    text: '',
  });
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // состояние side-меню
  const [isSideMenu, setIsSideMenu] = useState(false);
  // стейт найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]);
  console.log(foundMovies)
  // стейт состояния выполнения submit-а
  const [isSubmittingSearch, setIsSubmittingSearch] = useState(false);
  // ф-я закрытия меню
  const closeSideMenu = () => {
    setIsSideMenu(false);
    document.removeEventListener('keydown', handleEscClick);
  };
  // ф-я открытия меню
  const openSideMenu = () => {
    setIsSideMenu(true);
    document.addEventListener('keydown', handleEscClick);
  };
  // закрываем side-меню, если разрешение больше планшетного
  useEffect(() => {
    if (!isTablet) {
      setIsSideMenu(false);
    }
  }, [isTablet]);
  // ф-я закрытия меню по Esc
  const handleEscClick = (evt) => {
    if (evt.key === 'Escape') {
      closeSideMenu();
    }
  };
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
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            // загружаем информацию о пользователе
            mainApi
              .getUserInfo()
              .then((data) => {
                setCurrentUser(data);
              })
              .catch((error) => {
                console.log(error);
              });
            // загружаем сохраненные фильмы пользователя
            mainApi
              .getMovies()
              .then((data) => {
                console.log(data);
                setSavedMovies(data.reverse());
              })
              .catch((err) => {
                console.log(err);
              });
            // проверяем, есть ли в хранилище сохраненные фильмы
            if (localStorage.getItem('foundedMovies')) {
              setFoundMovies(
                JSON.parse(localStorage.getItem('foundedMovies') || '[]')
              );
            }
            setIsLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((res) => console.log(res));
    }
  };
  // авторизация
  const handleLogin = () => {
    handleTokenCheck();
    setIsLoggedIn(true);
  };

  return (
    <section className="app">
      <SideMenu
        isLoggedIn={isLoggedIn}
        isSideMenu={isSideMenu}
        closeSideMenu={closeSideMenu}
      />
      <InfoTooltip
        setTooltipState={setTooltipState}
        tooltipState={tooltipState}
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
          <Route path="/movies">
            <Movies
              isShortChecked={isShortChecked}
              setIsShortChecked={setIsShortChecked}
              isMobile={isMobile}
              isTablet={isTablet}
              setFoundMovies={setFoundMovies}
              isSubmittingSearch={isSubmittingSearch}
              setIsSubmittingSearch={setIsSubmittingSearch}
              getCurrentMovies={getCurrentMovies}
              setTooltipState={setTooltipState}
              foundMovies={foundMovies}
              isLoggedIn={isLoggedIn}
              openSideMenu={openSideMenu}
            />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies
              savedMovies={savedMovies}
              isShortChecked={isShortChecked}
              setIsShortChecked={setIsShortChecked}
              isMobile={isMobile}
              isTablet={isTablet}
              foundMovies={foundMovies}
              isLoggedIn={isLoggedIn}
              openSideMenu={openSideMenu}
            />
          </Route>
          <Route path="/profile">
            <Profile
              setTooltipState={setTooltipState}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
              isTablet={isTablet}
              isLoggedIn={isLoggedIn}
              openSideMenu={openSideMenu}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleLogin={handleLogin}
              setTooltipState={setTooltipState}
            />
          </Route>
          <Route path="/signin">
            <Login
              setTooltipState={setTooltipState}
              handleLogin={handleLogin}
            />
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
