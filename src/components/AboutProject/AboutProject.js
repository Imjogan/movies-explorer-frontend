import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id="about-project" className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <section className="about-project__information">
        <div className="about-project__information-box">
          <h3 className="about-project__information-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__information-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__information-box">
          <h3 className="about-project__information-title">
            На выполнение диплома ушло 5 недель
          </h3>
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
        <h3 className="about-project__name about-project__name_type_backend">
          Back-end
        </h3>
        <div className="about-project__weeks about-project__weeks_type_frontend">
          4 недели
        </div>
        <h3 className="about-project__name about-project__name_type_frontend">
          Front-end
        </h3>
      </section>
    </section>
  );
};

export default AboutProject;
