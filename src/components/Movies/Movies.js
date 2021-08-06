import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';

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
  setMovies,
  movies,
}) => {
  const [searchByMovies, setSearchByMovies] = useState('');
  // получаем поисковую фразу
  const getSearchByMovies = (text) => {
    setSearchByMovies(text);
  };

  return (
    <>
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <SearchForm
        setMovies={setMovies}
        getSearchByMovies={getSearchByMovies}
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
          movies={movies}
          searchByMovies={searchByMovies}
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
