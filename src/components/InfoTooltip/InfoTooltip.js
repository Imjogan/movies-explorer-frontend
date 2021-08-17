import './InfoTooltip.css';
import successful from '../../images/successful.svg';
import error from '../../images/error.svg';
import Button from '../Button/Button';

function InfoTooltip({ setTooltipState, tooltipState }) {

  const { tooltipVisible, isSuccessful, text } = tooltipState;

  const handleCloseClick = () => {
    setTooltipState({
      tooltipVisible: false,
      isSuccessful: isSuccessful,
      text: text,
    });
  };

  return (
    <section
      className={`info-tooltip ${tooltipVisible && 'info-tooltip_opened'}`}
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
        <h2 className="info-tooltip__title">{text}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
