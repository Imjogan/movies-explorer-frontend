import './Techs.css';
import HeaderBlock from '../HeaderBlock/HeaderBlock';
import TechnologyBlock from '../TechnologyBlock/TechnologyBlock';
import { techs } from '../../utils/constants';

const Techs = () => {
  return (
    <section id="techs" className="techs">
      <HeaderBlock title={'Технологии'} />
      <section className="techs__content">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          {techs.map((tech, i) => (
            <li key={i} className="techs__list-item">
              <TechnologyBlock name={tech} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Techs;
