import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const Movies = ({
  isTablet,
  isMobile,
  isLoggedIn,
  openSideMenu,
  foundMovies,
  setTooltipState,
  setFoundMovies,
  setIsShortChecked,
  isShortChecked,
  setIsLoaderVisible,
  isLoaderVisible,
  setSavedMovies,
  savedMovies,
  movies,
  setMovies,
}) => {
  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <SearchForm
        movies={movies}
        setMovies={setMovies}
        setIsLoaderVisible={setIsLoaderVisible}
        location={'non-saved'}
        isShortChecked={isShortChecked}
        setIsShortChecked={setIsShortChecked}
        setFoundMovies={setFoundMovies}
        setTooltipState={setTooltipState}
      />
      <section className="movies">
        <MoviesCardList
          setIsLoaderVisible={setIsLoaderVisible}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isLoaderVisible={isLoaderVisible}
          isShortChecked={isShortChecked}
          isTablet={isTablet}
          isMobile={isMobile}
          foundMovies={foundMovies}
        />
      </section>
      <Footer />
    </>
  );
};

export default Movies;
