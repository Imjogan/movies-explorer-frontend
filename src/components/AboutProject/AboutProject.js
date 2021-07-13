import './AboutProject.css';
import HeaderBlock from '../HeaderBlock/HeaderBlock';

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <HeaderBlock title={'О проекте'} />
      <section className="about-project__information">
        <div className="about-project__information-box">
          <p className="about-project__information-title">
            Дипломный проект включал 5 этапов
          </p>
          <p className="about-project__information-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__information-box">
          <p className="about-project__information-title">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="about-project__information-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </section>
      <section className="about-project__timeline">
        <div className="about-project__weeks about-project__weeks_type_backend">
          1 неделя
        </div>
        <p className="about-project__name about-project__name_type_backend">
          Back-end
        </p>
        <div className="about-project__weeks about-project__weeks_type_frontend">
          4 недели
        </div>
        <p className="about-project__name about-project__name_type_frontend">
          Front-end
        </p>
      </section>
    </section>
  );
};

export default AboutProject;
