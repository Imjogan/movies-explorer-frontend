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
  setIsShortChecked,
  isShortChecked,
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
        location={'non-saved'}
        isShortChecked={isShortChecked}
        setIsShortChecked={setIsShortChecked}
        setFoundMovies={setFoundMovies}
        setTooltipState={setTooltipState}
        getCurrentMovies={getCurrentMovies}
        setIsSubmittingSearch={setIsSubmittingSearch}
      />
      <section className="movies">
        <MoviesCardList
          isShortChecked={isShortChecked}
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
