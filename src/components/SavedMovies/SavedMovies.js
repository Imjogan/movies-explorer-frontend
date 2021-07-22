import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({ isTablet, isLoggedIn, openSideMenu }) => {
  return (
    <section className="saved-movies">
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </section>
  );
};

export default SavedMovies;
