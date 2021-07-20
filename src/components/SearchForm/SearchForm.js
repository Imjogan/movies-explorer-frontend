import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__line-box">
          <input
            className="search-form__input"
            minLength="5"
            placeholder="Фильм"
            required
          />
          <Button type="search" buttonType="submit" />
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;
