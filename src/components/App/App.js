import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

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
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
      />
      <Main />
      <Footer />
      <SideMenu
        isLoggedIn={isLoggedIn}
        isSideMenu={isSideMenu}
        closeSideMenu={closeSideMenu}
      />
    </section>
  );
};

export default App;
