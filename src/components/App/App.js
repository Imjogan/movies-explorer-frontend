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
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch } from 'react-router-dom';
import moviePicture from '../../images/movie.jpg';

const App = () => {
  //определяем устройство
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  // состояние попапа информации
  const [isInfoTooltipVisible, setIsInfoTooltipVisible] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  // состояние авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // состояние side-меню
  const [isSideMenu, setIsSideMenu] = useState(false);
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

  // временное решение
  const [movies, setMovies] = useState([
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'saved',
      id: 0,
    },
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'unsaved',
      id: 1,
    },
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'saved',
      id: 2,
    },
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'unsaved',
      id: 3,
    },
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'saved',
      id: 4,
    },
    {
      name: '33 слова о дизайне',
      image: moviePicture,
      duration: 1234,
      trailer: 'http://yandex.ru',
      status: 'unsaved',
      id: 5,
    },
  ]);

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
            movies={movies}
            setMovies={setMovies}
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            openSideMenu={openSideMenu}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            setMovies={setMovies}
            movies={movies}
            isTablet={isTablet}
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
        setIsInfoTooltipVisible={setIsInfoTooltipVisible}
        isInfoTooltipVisible={isInfoTooltipVisible}
        isSuccessful={isSuccessful}
      />
    </section>
  );
};

export default App;
