import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MoviesCardList = ({
  foundMovies,
  isSubmittingSearch,
  isTablet,
  isMobile,
}) => {
  const location = useLocation();
  // стейт параметров отображения фильмов
  const [moviesDisplayState, setMoviesDisplayState] = useState({
    moviesPerPage: 12,
    countOnLoad: 3,
  });
  // в зависимости от разрешения изменяем стейт отображения
  useEffect(() => {
    if (isMobile) {
      setMoviesDisplayState({ moviesPerPage: 5, countOnLoad: 2 });
    } else if (isTablet) {
      setMoviesDisplayState({ moviesPerPage: 8, countOnLoad: 2 });
    } else {
      setMoviesDisplayState({ moviesPerPage: 12, countOnLoad: 3 });
    }
  }, [isTablet, isMobile]);
  // обработчик кнопки "ещё"
  const handleLoadClick = () => {
    setMoviesDisplayState((prevState) => ({
      ...prevState,
      moviesPerPage:
        moviesDisplayState.moviesPerPage + moviesDisplayState.countOnLoad,
    }));
  };

  return (
    <>
      {isSubmittingSearch ? (
        <Preloader />
      ) : (
        foundMovies.length === 0 && (
          <p className="movies-list__not-found-items">Ничего не найдено</p>
        )
      )}
      {foundMovies.length > 0 && (
        <ul className="movies-list">
          {foundMovies
            ?.slice(0, moviesDisplayState.moviesPerPage)
            .map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
        </ul>
      )}

      {location.pathname === '/movies' &&
        foundMovies.length > moviesDisplayState.countOnLoad &&
        moviesDisplayState.moviesPerPage < foundMovies.length && (
          <Button onClick={handleLoadClick} text={'Ещё'} type={'more'} />
        )}
    </>
  );
};

export default MoviesCardList;
