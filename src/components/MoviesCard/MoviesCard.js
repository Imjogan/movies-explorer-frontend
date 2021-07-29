import './MoviesCard.css';
import Button from '../Button/Button';
import { useState } from 'react';
import { useLocation } from 'react-router';

const MoviesCard = ({ movie, setMovies, movies }) => {
  const location = useLocation();

  const [isButtonVisible, setIsButtonVisible] = useState(false);
  // показываем кнопку при наведении на карточку, если разрешение выше планшетного
  const handleMouseOverImage = () => {
    setIsButtonVisible(true);
  };
  // скрываем кнопку при уходе с карточки, если разрешение выше планшетного
  const handleMouseOutImage = () => {
    setIsButtonVisible(false);
  };

  const handleButtonSaveClick = () => {
    setMovies(updateState('saved'));
  };

  const handleButtonSavedClick = () => {
    setMovies(updateState('unsaved'));
  };

  const handleButtonDeleteClick = () => {
    setMovies(updateState('unsaved'));
  };

  function updateState(newStatus) {
    return movies.map((el) => {
      if (el.id === movie.id) {
        return {
          ...el,
          status: newStatus,
        };
      }
      return el;
    });
  }

  return (
    <section className="movies-card">
      <a
        onMouseOut={handleMouseOutImage}
        onMouseOver={handleMouseOverImage}
        href={movie.trailerLink}
        target="blank"
      >
        <img
          className="movies-card__image"
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        />
      </a>
      {movie.status === 'saved' ? (
        location.pathname !== '/saved-movies' ? (
          <Button type={'saved'} onClick={handleButtonSavedClick} />
        ) : (
          <Button
            additionalClass={isButtonVisible && 'button_visible'}
            type={'delete'}
            onClick={handleButtonDeleteClick}
          />
        )
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
