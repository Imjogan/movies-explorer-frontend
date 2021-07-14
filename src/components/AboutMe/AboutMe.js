import './AboutMe.css';
import HeaderBlock from '../HeaderBlock/HeaderBlock';
import studentPhoto from '../../images/student.jpg';

const AboutMe = () => {
  return (
    <section id="student" className="about-me">
      <HeaderBlock title={'Студент'} />
      <section className="about-me__content">
        <div className="about-me__info">
          <p className="about-me__name">Иван</p>
          <p className="about-me__position">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__text">
            Я живу в Санкт-Петербурге, закончил бакалавриат и магистратуру на
            факультете радиотехники в СПбГЭТУ "ЛЭТИ". Люблю слушать музыку,
            путешествовать и гулять на природе. С 2017 года работаю в «НИИ
            телевидения», занимаюсь настройкой и сдачей контрольно-проверочной
            аппаратуры для бортовых блоков летательных аппаратов, пишу
            техническую документацию. Еще во время учебы в Яндекс.Практикуме с
            другими студентами образовали команду и работаем над реальными
            проектами.
          </p>
          <ul className="about-me__links">
            <li className="about-me__item-link">
              <a
                className="about-me__link"
                target="_blank"
                href="https://github.com/Imjogan"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li className="about-me__item-link">
              <a
                className="about-me__link"
                target="_blank"
                href="http://linkedin.com/in/mjogan"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <img
          className="about-me__img"
          src={studentPhoto}
          alt="Фотография студента"
        />
      </section>
    </section>
  );
};

export default AboutMe;
