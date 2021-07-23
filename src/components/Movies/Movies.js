import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '../Button/Button';
import SearchForm from '../SearchForm/SearchForm';
import moviePicture from '../../images/movie.jpg';
// временный массив карточек
const movies = [
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
  {
    name: '33 слова о дизайне',
    image: moviePicture,
    duration: 1234,
    trailer: 'http://yandex.ru',
  },
];

const Movies = ({ isTablet, isLoggedIn, openSideMenu }) => {
  return (
    <section className="movies">
      <Header
        isTablet={isTablet}
        isLoggedIn={isLoggedIn}
        openSideMenu={openSideMenu}
        theme={'white'}
      />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Button text={'Ещё'} type={'more'} />
      <Footer />
    </section>
  );
};

export default Movies;
