import './InfoTooltip.css';
import successful from '../../images/successful.svg';
import error from '../../images/error.svg';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';

function InfoTooltip({
  setIsInfoTooltipVisible,
  isInfoTooltipVisible,
  isSuccessful,
}) {
  const history = useHistory();

  const handleCloseClick = () => {
    setIsInfoTooltipVisible(false);
    isSuccessful && history.push('/movies');
  };

  return (
    <section
      className={`info-tooltip ${
        isInfoTooltipVisible && 'info-tooltip_opened'
      }`}
    >
      <div className="info-tooltip__container">
        <Button
          onClick={handleCloseClick}
          type={'close'}
          additionalClass={'button_type_close_tooltip'}
        />
        <img
          className="info-tooltip__image"
          src={isSuccessful ? successful : error}
          alt="Все прошло успешно!"
        />
        <h2 className="info-tooltip__title">
          {isSuccessful
            ? 'Все прошло успешно!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
