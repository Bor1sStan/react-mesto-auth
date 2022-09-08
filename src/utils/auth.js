class Auth {
  constructor(config) {
    this.BASE_URL = config.url;
  }

  _checkErorr(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ой! Ошибка " + res.status);
  }

  regist = (password, email) => {
    return fetch(`${this.BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email
      }),
    }).then(this._checkErorr);
  };

  login = (password, email) => {
    return fetch(`${this.BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        email: email
      }),
    }).then(this._checkErorr);
  };

  getToken = (token) => {
    return fetch(`${this.BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkErorr);
  };
}

export const auth = new Auth({
  url: "https://api.nomoreparties.co",
});

// const BASE_URL = "https://api.nomoreparties.co";
