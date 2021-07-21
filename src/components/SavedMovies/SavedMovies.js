import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
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
      <Button text={'Ещё'} type={'more'} />
      <Footer />
    </section>
  );
};

export default SavedMovies;
