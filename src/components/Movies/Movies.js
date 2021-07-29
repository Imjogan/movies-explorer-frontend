import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({ isTablet, isLoggedIn, openSideMenu, movies, setMovies }) => {
  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <section className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} setMovies={setMovies} />
        <Button text={'Ещё'} type={'more'} />
      </section>
      <Footer />
    </>
  );
};

export default Movies;
