import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ foundMovies, setMovies, isSubmittingSearch }) => {
  const location = useLocation();

  return (
    <>
      {isSubmittingSearch && <Preloader />}
      {foundMovies.length > 0 && (
        <ul className="movies-list">
          {foundMovies?.map((movie, i) => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              setMovies={setMovies}
              movies={foundMovies}
            />
          ))}
        </ul>
      )}

      {location.pathname === '/movies' && foundMovies.length > 3 && <Button text={'Ещё'} type={'more'} />}
    </>
  );
};

export default MoviesCardList;
