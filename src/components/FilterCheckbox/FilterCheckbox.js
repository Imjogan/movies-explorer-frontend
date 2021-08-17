import './FilterCheckbox.css';
import { useCallback } from 'react';

const FilterCheckbox = ({ setIsShortChecked, isShortChecked }) => {
  // обработчик чекбокса
  const handleCheck = useCallback(() => {
    setIsShortChecked(!isShortChecked);
  }, [isShortChecked, setIsShortChecked]);

  return (
    <section className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          checked={isShortChecked}
          onChange={handleCheck}
        />
        <span className="filter-checkbox__round"></span>
      </label>
      <p className="filter-checkbox__title">Короткометражки</p>
    </section>
  );
};

export default FilterCheckbox;
