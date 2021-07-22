import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({ movies }) => {
  return (
    <ul className="movies-list">
      {/* <Preloader /> */}
      {movies?.map((movie, i) => (
        <li key={i} className="movies-list__element">
          <MoviesCard key={movie.id} movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MoviesCardList;
