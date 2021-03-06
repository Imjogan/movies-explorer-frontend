import './SideMenu.css';
import Navigation from '../Navigation/Navigation';
import Button from '../Button/Button';

function SideMenu({ isSideMenu, closeSideMenu }) {
  return (
    <section className={`side-menu ${isSideMenu && 'side-menu_opened'}`}>
      <div className="side-menu__content">
        <Button onClick={closeSideMenu} type={'close'} />
        <Navigation navStyle={'side'} closeSideMenu={closeSideMenu} />
        <Button
          type={'account'}
          text={'Аккаунт'}
          closeSideMenu={closeSideMenu}
        />
      </div>
    </section>
  );
}

export default SideMenu;
