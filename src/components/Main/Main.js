import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';

const Main = () => {
  return (
    <section className="main">
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
    </section>
  );
}

export default Main;
