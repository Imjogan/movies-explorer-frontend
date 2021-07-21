import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import SideMenu from '../SideMenu/SideMenu';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  //определяем устройство
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

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
            isTablet={isTablet}
            isLoggedIn={isLoggedIn}
            openSideMenu={openSideMenu}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
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
      </Switch>
    </section>
  );
};

export default App;
