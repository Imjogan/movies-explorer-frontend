import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect, useCallback } from 'react';
import { validateField, validators } from '../../utils/utils';
import moviesApi from '../../utils/MoviesApi';

const SearchForm = ({
  setTooltipState,
  getCurrentMovies,
  setIsSubmittingSearch,
  setFoundMovies,
}) => {
  // стейт значения инпута
  const [formValue, setFormValue] = useState({
    search: '',
  });
  // обнуляем инпут при обновлении компонента
  useEffect(() => {
    return () => {
      setFormValue({
        search: '',
      });
    };
  }, []);
  // состояние ошибок в инпутах
  const [errors, setErrors] = useState({
    search: {
      required: true,
    },
  });

  const handleInputChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setFormValue((state) => ({ ...state, [name]: value }));
    },
    [setFormValue]
  );

  // валидация инпута при обновлении значеня
  useEffect(
    function validateInputs() {
      const { search } = formValue;
      const searchValidationResult = validateField(validators.search, search);
      setErrors({
        search: searchValidationResult,
      });
    },
    [formValue, setErrors]
  );
  // вытаскиваем значение инпута
  const { search } = formValue;
  // проверяем валидность инпута
  const isSearchInvalid = Object.values(errors.search).some(Boolean);

  // обработчик submit-а
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isSearchInvalid) {
      setTooltipState({
        tooltipVisible: true,
        isSuccessful: false,
        text: 'Нужно ввести ключевое слово',
      });
    } else {
      // очищаем массив найденных фильмов перед новым поиском
      setFoundMovies([]);
      // активируем прелоадер
      setIsSubmittingSearch(true);
      moviesApi
        .getMovies()
        .then((movies) => {
          getCurrentMovies(
            movies.filter((movie) =>
              movie.nameRU.toLowerCase().includes(search.toLowerCase())
            )
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsSubmittingSearch(false);
        });
    }
  };

  return (
    <section className="search-form">
      <form noValidate className="search-form__form">
        <div className="search-form__line-box">
          <input
            name="search"
            className="search-form__input"
            minLength="5"
            placeholder="Фильм"
            required
            value={search}
            onChange={handleInputChange}
          />
          <Button onClick={handleSubmit} type="search" buttonType="submit" />
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;
