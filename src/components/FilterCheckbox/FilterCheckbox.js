import './FilterCheckbox.css';
import { useCallback, useState } from 'react';

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <section className="filter-checkbox">
      <label class="filter-checkbox__switch">
        <input
          onClick={handleCheck}
          className="filter-checkbox__checkbox"
          type="checkbox"
          checked={isChecked}
        />
        <span class="filter-checkbox__round"></span>
      </label>
      <p className="filter-checkbox__title">Короткометражки</p>
    </section>
  );
};

export default FilterCheckbox;
