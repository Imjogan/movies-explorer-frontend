import './Movies.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Movies = ({ isTablet, isLoggedIn, openSideMenu }) => {
  return (
    <section className="movies">
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <ul className="movies-list">
        <li className="movies-list__element">
          <MoviesCard />
        </li>
        <li className="movies-list__element">
          <MoviesCard />
        </li>
        <li className="movies-list__element">
          <MoviesCard />
        </li>
        <li className="movies-list__element">
          <MoviesCard />
        </li>
        <li className="movies-list__element">
          <MoviesCard />
        </li>
        <li className="movies-list__element">
          <MoviesCard />
        </li>
      </ul>
      <Footer />
    </section>
  );
};

export default Movies;
