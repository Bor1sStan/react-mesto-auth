class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkErorr(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Ошибка" + res.status);
  }

  // GET карточки
  getCardList() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkErorr);
  }

  // POST карточки
  addCard(cardData) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._checkErorr);
  }

  // DELETE карточки / карточкиID
  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkErorr);
  }

  // GET информацию пол-лей
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkErorr);
  }

  // PATCH информацию пол-лей
  changeUserInfo(userData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(this._checkErorr);
  }

  // PATCH аватар
  changeAvatar(avatar) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkErorr);
  }

  // PUT/DELETE  -  поставить/убрать лайк
  handleCardLike(id, method) {
    if (method) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkErorr);
    } else {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkErorr);
    }
  }

}



const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-45/",
  headers: {
    authorization: "5a6be8b2-4a4c-47e9-858f-d764586fc39f",
    "Content-Type": "application/json",
  },
});

export default api;
