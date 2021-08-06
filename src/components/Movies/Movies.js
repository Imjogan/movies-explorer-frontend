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
  getCurrentMovies,
  setFoundMovies,
  setIsShortChecked,
  isShortChecked,
  setIsLoaderVisible,
  isLoaderVisible,
  setSavedMovies,
  savedMovies,
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
        setIsLoaderVisible={setIsLoaderVisible}
        location={'non-saved'}
        isShortChecked={isShortChecked}
        setIsShortChecked={setIsShortChecked}
        setFoundMovies={setFoundMovies}
        setTooltipState={setTooltipState}
        getCurrentMovies={getCurrentMovies}
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
