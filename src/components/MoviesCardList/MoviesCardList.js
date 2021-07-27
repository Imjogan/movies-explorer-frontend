import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies, setMovies }) => {
  return (
    <ul className="movies-list">
      {/* <Preloader /> */}
      {movies?.map((movie, i) => (
        <li key={i} className="movies-list__element">
          <MoviesCard
            key={movie.id}
            movie={movie}
            setMovies={setMovies}
            movies={movies}
          />
        </li>
      ))}
    </ul>
  );
};

export default MoviesCardList;
