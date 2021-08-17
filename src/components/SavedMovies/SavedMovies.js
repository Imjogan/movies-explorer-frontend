import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

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
  foundMovies,
  setSavedMovies,
  setIsLoaderVisible,
}) => {
  const [searchBySavedMovies, setSearchBySavedMovies] = useState('');
  // получаем поисковую фразу
  const getSearchBySavedMovies = (text) => {
    setSearchBySavedMovies(text);
  };

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
          getSearchBySavedMovies={getSearchBySavedMovies}
          location={'saved'}
          setIsShortChecked={setIsShortChecked}
          isShortChecked={isShortChecked}
          setTooltipState={setTooltipState}
          setIsSubmittingSearch={setIsSubmittingSearch}
        />
        <MoviesCardList
          setIsLoaderVisible={setIsLoaderVisible}
          searchBySavedMovies={searchBySavedMovies}
          setSavedMovies={setSavedMovies}
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
