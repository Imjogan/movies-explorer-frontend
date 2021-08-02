import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  isTablet,
  isMobile,
  isLoggedIn,
  openSideMenu,
  setTooltipState,
  setIsSubmittingSearch,
  isSubmittingSearch,
  setIsShortChecked,
  isShortChecked,
  savedMovies,
  foundMovies
}) => {

  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <section className="saved-movies">
        <SearchForm
          location={'saved'}
          setIsShortChecked={setIsShortChecked}
          isShortChecked={isShortChecked}
          setTooltipState={setTooltipState}
          setIsSubmittingSearch={setIsSubmittingSearch}
        />
        <MoviesCardList
          foundMovies={foundMovies}
          savedMovies={savedMovies}
          isShortChecked={isShortChecked}
          isTablet={isTablet}
          isMobile={isMobile}
          isSubmittingSearch={isSubmittingSearch}
        />
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;
