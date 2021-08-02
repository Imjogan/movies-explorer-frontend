import './MoviesCard.css';
import Button from '../Button/Button';
import { useState } from 'react';
import { useLocation } from 'react-router';
import mainApi from '../../utils/MainApi';

const MoviesCard = ({ movie, foundMovies }) => {
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
  // сохраняем фильм
  const handleButtonSaveClick = () => {
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
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleButtonSavedClick = () => {
    // setMovies(updateState('unsaved'));
  };

  const handleButtonDeleteClick = () => {
    // setMovies(updateState('unsaved'));
  };

  // function updateState(newStatus) {
  //   return movies.map((el) => {
  //     if (el.id === movie.id) {
  //       return {
  //         ...el,
  //         status: newStatus,
  //       };
  //     }
  //     return el;
  //   });
  // }

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
          src={
            movie.image.url
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        />
      </a>
      {foundMovies?.filter((film) => film.id === movie.movieId) ? (
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
