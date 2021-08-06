import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useState, useEffect, useCallback } from 'react';
import { validateField, validators } from '../../utils/utils';
import moviesApi from '../../utils/MoviesApi';

const SearchForm = ({
  setTooltipState,
  setFoundMovies,
  setIsShortChecked,
  isShortChecked,
  location,
  setIsLoaderVisible,
  getSearchBySavedMovies,
  movies,
  setMovies,
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
  // если поисковая строка пустая - показываем все сохраненные фильмы
  useEffect(() => {
    location === 'saved' && search === '' && getSearchBySavedMovies(search);
  }, [search, location, getSearchBySavedMovies]);
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
      // проверяем, где используем поиск
      if (location === 'saved') {
        getSearchBySavedMovies(search);
      } else {
        // удаляем фильмы из хранилища перед новым поиском
        localStorage.removeItem('foundedMovies');
        // если ищем фильм первый раз
        if (!movies.length) {
          // активируем лоадер
          setIsLoaderVisible(true);
          moviesApi
            .getMovies()
            .then((moviesOnApi) => {
              // загружаем фильмы
              setMovies(moviesOnApi);
              return moviesOnApi;
            })
            .then((moviesOnApi) => {
              // фильтруем фильмы, соответствующие поиску
              const foundedMovies = moviesOnApi.filter((movie) =>
                movie.nameRU.toLowerCase().includes(search.toLowerCase())
              );
              // сохраняем в хранилище
              localStorage.setItem('foundedMovies', JSON.stringify(foundedMovies));
              // загружаем в стейт соответствующие
              setFoundMovies(foundedMovies);
            })
            .catch(() => {
              setTooltipState({
                tooltipVisible: true,
                isSuccessful: false,
                text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
              });
            })
            .finally(() => {
              // останавливаем лоадер
              setIsLoaderVisible(false);
            });
        }
        // если поиск уже был
        else {
          // фильтруем фильмы, соответствующие поиску
          const foundedMovies = movies.filter((movie) =>
            movie.nameRU.toLowerCase().includes(search.toLowerCase())
          );
          // сохраняем в хранилище
          localStorage.setItem('foundedMovies', JSON.stringify(foundedMovies));
          // загружаем в стейт соответствующие
          setFoundMovies(foundedMovies);
        }
      }
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
          <Button
            additionalClass={isSearchInvalid && 'button_disabled'}
            onClick={handleSubmit}
            type="search"
            buttonType="submit"
          />
        </div>
        <FilterCheckbox
          setIsShortChecked={setIsShortChecked}
          isShortChecked={isShortChecked}
        />
      </form>
    </section>
  );
};

export default SearchForm;
