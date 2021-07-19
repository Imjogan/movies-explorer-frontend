import './MoviesCard.css';
import moviePicture from '../../images/movie.jpg';
import Button from '../Button/Button';
import { useState } from 'react';

const MoviesCard = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleMouseOverImage = () => {
    setIsButtonVisible(true);
  };

  const handleMouseOutImage = () => {
    setIsButtonVisible(false);
  };

  return (
    <section className="movies-card">
      <a
        onMouseOut={handleMouseOutImage}
        onMouseOver={handleMouseOverImage}
        href="#"
        target="blank"
      >
        <img className="movies-card__image" src={moviePicture} alt="Название" />
        <Button
          additionalClass={isButtonVisible && 'button_visible'}
          text={'Сохранить'}
          type={'save'}
        />
        {/* <Button type={'saved'} /> */}
        {/* <Button
          additionalClass={isButtonVisible && 'button_visible'}
          type={'delete'}
        /> */}
      </a>
      <div className="movies-card__info">
        <p className="movies-card__name">33 слова о дизайне</p>
        <div className="movies-card__duration">1ч 17м</div>
      </div>
    </section>
  );
};

export default MoviesCard;
