import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies, setMovies }) => {
  return (
    <ul className="movies-list">
      {/* <Preloader /> */}
      {movies?.map((movie, i) => (
        <MoviesCard
          key={movie.id}
          movie={movie}
          setMovies={setMovies}
          movies={movies}
        />
      ))}
    </ul>
  );
};

export default MoviesCardList;
