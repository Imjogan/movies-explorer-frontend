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
  setIsSubmittingSearch,
  isSubmittingSearch,
  setFoundMovies,
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
        setFoundMovies={setFoundMovies}
        setTooltipState={setTooltipState}
        getCurrentMovies={getCurrentMovies}
        setIsSubmittingSearch={setIsSubmittingSearch}
      />
      <section className="movies">
        <MoviesCardList
          isTablet={isTablet}
          isMobile={isMobile}
          isSubmittingSearch={isSubmittingSearch}
          foundMovies={foundMovies}
        />
      </section>
      <Footer />
    </>
  );
};

export default Movies;
