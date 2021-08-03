class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  #currentToken = '';
  set currentToken(value) {
    this.#currentToken = value;
  }

  register = (name, email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name, email, password }),
    }).then((response) => {
      return response.json();
    });
  };

  authorize = (password, email) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          localStorage.setItem('token', data.token);
          return data;
        }
      });
  };

  checkToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => data);
  };

  // получаем информацию о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#currentToken}`,
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // получаем информацию о карточках
  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#currentToken}`,
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialData() {
    return Promise.all([this.getMovies(), this.getUserInfo()]);
  }

  // отправляем информацию о пользователе
  setUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#currentToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // создаем фильм
  createMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  ) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#currentToken}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // удаляем фильм
  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#currentToken}`,
      },
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

// создаем класс для связи с сервером
const mainApi = new MainApi({
  baseUrl: 'https://api.movies-explorer.mj.nomoredomains.rocks',
});

export default mainApi;
