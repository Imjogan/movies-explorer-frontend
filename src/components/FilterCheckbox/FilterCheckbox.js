import './FilterCheckbox.css';
import { useCallback, useState } from 'react';

const FilterCheckbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = useCallback(() => {
    setIsChecked(!isChecked);
  }, [isChecked]);

  return (
    <section className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
        />
        <span className="filter-checkbox__round"></span>
      </label>
      <p className="filter-checkbox__title">Короткометражки</p>
    </section>
  );
};

export default FilterCheckbox;
