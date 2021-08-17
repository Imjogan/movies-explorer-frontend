import './MoviesCard.css';
import Button from '../Button/Button';
import { useState } from 'react';
import { useLocation } from 'react-router';
import mainApi from '../../utils/MainApi';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const MoviesCard = ({
  movie,
  setSavedMovies,
  savedMovies,
  numberOfCards,
  setIsLoaderVisible,
}) => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  // стейт состояния кнопки на карточке при разных разрешениях
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  // показываем кнопку при наведении на карточку, если разрешение выше планшетного
  const handleMouseOverImage = () => {
    setIsButtonVisible(true);
  };
  // скрываем кнопку при уходе с карточки, если разрешение выше планшетного
  const handleMouseOutImage = () => {
    setIsButtonVisible(false);
  };
  // сохраняем фильм
  const handleButtonSaveClick = () => {
    setIsLoaderVisible(true);
    mainApi
      .createMovie(
        movie.country,
        movie.director,
        movie.duration,
        movie.year,
        movie.description,
        `https://api.nomoreparties.co${movie.image.url}`,
        movie.trailerLink,
        movie.nameRU,
        movie.nameEN,
        `https://api.nomoreparties.co${movie.image.url}`,
        movie.id
      )
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaderVisible(false);
      });
  };
  // удаляем фильм со страницы фильмов
  const handleButtonSavedClick = () => {
    setIsLoaderVisible(true);
    mainApi
      .deleteMovie(savedMovies?.find((item) => item.movieId === movie.id)._id)
      .then(() => {
        setSavedMovies((oldMovies) =>
          oldMovies.filter((oldMovie) => oldMovie.movieId !== movie.id)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaderVisible(false);
      });
  };
  // удаляем фильм со страницы сохраненных фильмов
  const handleButtonDeleteClick = () => {
    setIsLoaderVisible(true);
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((oldMovies) =>
          oldMovies.filter((oldMovie) => oldMovie._id !== movie._id)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoaderVisible(false);
      });
  };

  return (
    <section
      className={`movies-card ${numberOfCards === 1 && 'movies-card_once'}`}
    >
      <a
        onMouseOut={handleMouseOutImage}
        onMouseOver={handleMouseOverImage}
        href={movie.trailerLink}
        target="blank"
      >
        <img
          className="movies-card__image"
          src={
            movie.image.url
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        />
      </a>
      {((savedMovies?.find(
        (item) => item.movieId === movie.id && item.owner === currentUser._id
      ) &&
        true) ||
        false) &&
      location.pathname === '/movies' ? (
        <Button type={'saved'} onClick={handleButtonSavedClick} />
      ) : location.pathname === '/saved-movies' ? (
        <Button
          additionalClass={isButtonVisible && 'button_visible'}
          type={'delete'}
          onClick={handleButtonDeleteClick}
        />
      ) : (
        <Button
          additionalClass={isButtonVisible && 'button_visible'}
          text={'Сохранить'}
          type={'save'}
          onClick={handleButtonSaveClick}
        />
      )}
      <div className="movies-card__info">
        <p className="movies-card__name">{movie.nameRU}</p>
        <div className="movies-card__duration">{`${Math.floor(
          movie.duration / 60
        )}ч ${movie.duration % 60}м`}</div>
      </div>
    </section>
  );
};

export default MoviesCard;
