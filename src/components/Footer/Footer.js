import './Footer.css';

const Footer = () => {
  const currentDate = new Date().getFullYear();

  return (
    <section className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__line" />
      <div className="footer__data">
        <p className="footer__copyright">&copy; {currentDate}</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a
              href="https://praktikum.yandex.ru/"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a
              href="https://github.com/Imjogan"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              GitHub
            </a>
          </li>
          <li className="footer__list-item">
            <a
              href="http://linkedin.com/in/mjogan"
              rel="noreferrer"
              target="_blank"
              className="footer__link"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
