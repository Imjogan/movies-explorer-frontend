import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ isTablet, isLoggedIn, openSideMenu, movies, setMovies }) => {
  const savedMovies = movies.filter((movie) => movie.status === 'saved' && movie);

  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <section className="saved-movies">
        <SearchForm />
        <MoviesCardList movies={savedMovies} setMovies={setMovies} />
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;
