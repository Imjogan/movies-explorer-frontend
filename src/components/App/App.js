import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SideMenu from '../SideMenu/SideMenu';
import { useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSideMenu, setIsSideMenu] = useState(false);

  const closeSideMenu = () => {
    setIsSideMenu(false);
  };

  const openSideMenu = () => {
    setIsSideMenu(true);
  };

  return (
    <section className="app">
      <Header isLoggedIn={isLoggedIn} openSideMenu={openSideMenu} />
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
