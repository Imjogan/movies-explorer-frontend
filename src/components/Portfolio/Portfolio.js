import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://imjogan.github.io/how-to-learn/"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <p className="portfolio__link-name">Статичный сайт</p>
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://imjogan.github.io/russian-travel/"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <p className="portfolio__link-name">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://imjogan.github.io/react-mesto-auth/"
            target="_blank"
            className="portfolio__link"
            rel="noreferrer"
          >
            <p className="portfolio__link-name">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">&#8599;</p>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;
