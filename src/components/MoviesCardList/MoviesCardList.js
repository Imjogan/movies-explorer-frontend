import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import Button from '../Button/Button';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCardList = ({
  foundMovies,
  isSubmittingSearch,
  isTablet,
  isMobile,
  isShortChecked,
  savedMovies,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  // проверяем, есть ли фильтрация длительности
  const filteredMovies = foundMovies
    ? isShortChecked
      ? foundMovies.filter((movie) => movie.duration < 40)
      : foundMovies
    : [];
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
      ) : location.pathname === '/movies' ? (
        filteredMovies.length === 0 && (
          <p className="movies-list__not-found-items">Ничего не найдено</p>
        )
      ) : (
        savedMovies.length === 0 && (
          <p className="movies-list__not-found-items">
            Вы ещё ничего не сохраняли
          </p>
        )
      )}
      {location.pathname === '/movies' && filteredMovies.length > 0 && (
        <ul className="movies-list">
          {filteredMovies
            ?.slice(0, moviesDisplayState.moviesPerPage)
            .map((movie) => (
              <MoviesCard key={movie.id} movie={movie} />
            ))}
        </ul>
      )}
      {location.pathname === '/saved-movies' && savedMovies.length > 0 && (
        <ul className="movies-list">
          {savedMovies?.map(
            (movie) =>
              movie.owner === currentUser._id && (
                <MoviesCard foundMovies={foundMovies} key={movie._id} movie={movie} />
              )
          )}
        </ul>
      )}

      {location.pathname === '/movies' &&
        filteredMovies.length > moviesDisplayState.countOnLoad &&
        moviesDisplayState.moviesPerPage < filteredMovies.length && (
          <Button onClick={handleLoadClick} text={'Ещё'} type={'more'} />
        )}
    </>
  );
};

export default MoviesCardList;
