import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <a href="#about-project" className="nav-tab__item">О проекте</a>
      <a href="#techs" className="nav-tab__item">Технологии</a>
      <a href="#student" className="nav-tab__item">Студент</a>
    </nav>
  );
};

export default NavTab;
