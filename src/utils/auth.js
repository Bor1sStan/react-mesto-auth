class Auth {
  constructor(config) {
    this.BASE_URL = config.url;
  }

  _checkErorr(res) {
    return res.ok ? res.json() : Promise.reject("Ой! Ошибка " + res.status);
  }

// POST - регистрация пользователя
  regist = (password, email) => {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
    .then(this._checkErorr);
  };

// POST - залогинить пользователя
  login = (password, email) => {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email
      }),
    })
    .then(this._checkErorr);
  };

// GET - проверка токена и получение емэила
  getToken = (token) => {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((res) => res)
    .then(this._checkErorr)
    .then((data) => data);
  };
}

export const auth = new Auth({
  url: "https://auth.nomoreparties.co",
});