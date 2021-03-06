import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <a href="#about-project" target="_self" className="nav-tab__item">
        О проекте
      </a>
      <a href="#techs" target="_self" className="nav-tab__item">
        Технологии
      </a>
      <a href="#student" target="_self" className="nav-tab__item">
        Студент
      </a>
    </nav>
  );
};

export default NavTab;
