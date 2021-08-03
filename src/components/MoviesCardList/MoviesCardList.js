import './MoviesCardList.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

const MoviesCardList = ({
  foundMovies,
  isTablet,
  isMobile,
  isShortChecked,
  savedMovies,
  isLoaderVisible,
  setSavedMovies,
  searchBySavedMovies,
  setIsLoaderVisible,
}) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  // показываем фильмы в зависимости от активности фильтра длительности
  const displayedMovies = isShortChecked
    ? foundMovies.filter((movie) => movie.duration < 40)
    : foundMovies;
  // сохраненные фильмы текущего пользователя
  const savedMoviesOfCurrentUser = savedMovies.filter(
    (movie) => movie.owner === currentUser._id
  );
  // показываем сохраненные фильмы в зависимости от активности фильтра длительности
  const displayedSavedMovies = isShortChecked
    ? savedMoviesOfCurrentUser.filter((movie) => movie.duration < 40)
    : savedMoviesOfCurrentUser;
  // показываем сохраненные фильмы при поиске
  const displayedSavedMoviesWithSearch =
    searchBySavedMovies !== ''
      ? displayedSavedMovies.filter((movie) =>
          movie.nameRU
            .toLowerCase()
            .includes(searchBySavedMovies?.toLowerCase())
        )
      : displayedSavedMovies;
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
  // обработчик кнопки "Ещё"
  const handleLoadClick = () => {
    setMoviesDisplayState((prevState) => ({
      ...prevState,
      moviesPerPage:
        moviesDisplayState.moviesPerPage + moviesDisplayState.countOnLoad,
    }));
  };

  return (
    <>
      {/* показываем фразу "Ничего не найдено" на странице movies */}
      {!isLoaderVisible &&
        location.pathname === '/movies' &&
        displayedMovies.length === 0 && (
          <p className="movies-list__not-found-items">Ничего не найдено</p>
        )}
      {/* показываем фразу "Вы ещё ничего не сохраняли" на странице saved-movies */}
      {!isLoaderVisible &&
        location.pathname === '/saved-movies' &&
        displayedSavedMoviesWithSearch.length === 0 && (
          <p className="movies-list__not-found-items">
            Вы ещё ничего не сохраняли
          </p>
        )}
      {/* показываем фильмы на странице movies */}
      {location.pathname === '/movies' && displayedMovies.length > 0 && (
        <ul className="movies-list">
          {displayedMovies
            ?.slice(0, moviesDisplayState.moviesPerPage)
            .map((movie) => (
              <MoviesCard
                numberOfCards={displayedMovies.length}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                key={movie.id}
                movie={movie}
                setIsLoaderVisible={setIsLoaderVisible}
              />
            ))}
        </ul>
      )}
      {/* показываем фильмы на странице saved-movies */}
      {location.pathname === '/saved-movies' && savedMovies.length > 0 && (
        <ul className="movies-list">
          {displayedSavedMoviesWithSearch?.map((savedMovie) => (
            <MoviesCard
              numberOfCards={displayedSavedMoviesWithSearch.length}
              setSavedMovies={setSavedMovies}
              key={savedMovie._id}
              movie={savedMovie}
              setIsLoaderVisible={setIsLoaderVisible}
            />
          ))}
        </ul>
      )}
      {/* показываем кнопку "Ещё" на странице movies */}
      {location.pathname === '/movies' &&
        displayedMovies.length > moviesDisplayState.countOnLoad &&
        moviesDisplayState.moviesPerPage < displayedMovies.length && (
          <Button onClick={handleLoadClick} text={'Ещё'} type={'more'} />
        )}
    </>
  );
};

export default MoviesCardList;
