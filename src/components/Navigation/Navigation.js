import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../utils/links';

const Navigation = ({ navStyle, closeSideMenu }) => {

  return (
    <nav className={navStyle === 'side' ? 'side-navigation' : 'navigation'}>
      {(navStyle === 'side' ? navLinks : navLinks.slice(1)).map((link, i) => (
        <NavLink
          exact
          onClick={closeSideMenu}
          key={i}
          to={link[1]}
          activeClassName={
            navStyle === 'side'
              ? 'side-navigation__link_active'
              : 'navigation__link_active'
          }
          className={
            navStyle === 'side' ? 'side-navigation__link' : 'navigation__link'
          }
        >
          {link[0]}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
