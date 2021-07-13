import './Main.css';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';

const Main = () => {
  return (
    <section className="main">
      <Promo />
      <NavTab />
      <AboutProject />
    </section>
  );
}

export default Main;
