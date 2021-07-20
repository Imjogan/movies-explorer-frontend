import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  return (
    <ul className="movies-list">
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
      <li className="movies-list__element">
        <MoviesCard />
      </li>
    </ul>
  );
};

export default MoviesCardList;
