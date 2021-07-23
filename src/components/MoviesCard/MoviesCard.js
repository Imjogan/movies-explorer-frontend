import './MoviesCard.css';
import Button from '../Button/Button';
import { useState } from 'react';

const MoviesCard = ({ movie }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  // показываем кнопку при наведении на карточку, если разрешение выше планшетного
  const handleMouseOverImage = () => {
    setIsButtonVisible(true);
  };
  // скрываем кнопку при уходе с карточки, если разрешение выше планшетного
  const handleMouseOutImage = () => {
    setIsButtonVisible(false);
  };

  return (
    <section className="movies-card">
      <a
        onMouseOut={handleMouseOutImage}
        onMouseOver={handleMouseOverImage}
        href={movie.trailer}
        target="blank"
      >
        <img
          className="movies-card__image"
          src={movie.image}
          alt={movie.name}
        />
        {/* если карточка не добавлена пользователем - должна быть кнопка "сохранить" */}
        <Button
          additionalClass={isButtonVisible && 'button_visible'}
          text={'Сохранить'}
          type={'save'}
        />
        {/* если карточка сохранена у пользователя - на странице фильмов должна быть кнпока "добавлено" */}
        {/* <Button type={'saved'} /> */}
        {/* если карточка сохранена у пользователя - на странице сохраненных фильмов должна быть кнпока "удалить" */}
        {/* <Button
          additionalClass={isButtonVisible && 'button_visible'}
          type={'delete'}
        /> */}
      </a>
      <div className="movies-card__info">
        <p className="movies-card__name">{movie.name}</p>
        <div className="movies-card__duration">{`${Math.floor(
          movie.duration / 60
        )}ч ${movie.duration % 60}м`}</div>
      </div>
    </section>
  );
};

export default MoviesCard;
