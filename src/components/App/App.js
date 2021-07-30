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
import { Route, Switch } from 'react-router-dom';

const App = () => {
  //определяем устройство
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  // состояние чекбокса короткометражки
  const [isShortChecked, setIsShortChecked] = useState(false);
  // состояние попапа информации и текст
  const [tooltipState, setTooltipState] = useState({
    tooltipVisible: false,
    isSuccessful: false,
    text: '',
  });
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // состояние side-меню
  const [isSideMenu, setIsSideMenu] = useState(false);
  // стейт найденных фильмов
  const [foundMovies, setFoundMovies] = useState([]);
  // проверяем, есть ли в хранилище сохраненные фильмы
  useEffect(() => {
    if (localStorage.getItem('foundedMovies')) {
      setFoundMovies(JSON.parse(localStorage.getItem('foundedMovies') || '[]'));
    }
  }, []);
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

  return (
    <section className="app">
      <SideMenu
        isLoggedIn={isLoggedIn}
        isSideMenu={isSideMenu}
        closeSideMenu={closeSideMenu}
      />
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
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            openSideMenu={openSideMenu}
          />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <InfoTooltip
        setTooltipState={setTooltipState}
        tooltipState={tooltipState}
      />
    </section>
  );
};

export default App;
