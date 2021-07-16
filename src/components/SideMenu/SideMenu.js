import './SideMenu.css';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

function SideMenu({ isSideMenu, closeSideMenu }) {
  const handleClick = () => {
    closeSideMenu();
  };

  return (
    <>
      <section className={`side-menu ${isSideMenu && 'side-menu_opened'}`}>
        {/* <div className="blackout" /> */}
        <button
          onClick={handleClick}
          type="button"
          className="side-menu__button-close"
        />
        <Navigation />
        <nav className="side-menu__account">
          <Link
            to="/profile"
            className="side-menu__account-link"
          >
            Аккаунт
          </Link>
        </nav>
      </section>
    </>
  );
}

export default SideMenu;
