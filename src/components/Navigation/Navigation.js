import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <section className="navigation">
      <nav className="navigation__routes">
        <NavLink
          to="/movies"
          activeClassName="navigation__link_active"
          className="navigation__link"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          activeClassName="navigation__link_active"
          className="navigation__link"
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
    </section>
  );
};

export default Navigation;
