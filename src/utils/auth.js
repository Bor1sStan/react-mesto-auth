class Auth {
   constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
   }

   _checkErorr(res) {
      if(res.ok) {
         return res.json();
      }
      return Promise.reject(`Ой!..Ошибочка. Что-то пошло не так: ${res.status}`);
   }

   regist( {password, email} ) {
      return fetch(`${this._url}/signup`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            password: password,
            email: email
         })
      }).then(this._checkErorr);
   }

   signIn( {password, email} ) {
      return fetch(`${this._url}/signin`, {
         method: "POST",
         headers: this._headers,
         body: JSON.stringify({
            password: password,
            email: email})
      }).then(this._checkErorr);
   }

   getToken(token) {
      return fetch(`${this._url}/users/me`, {
         method: "GET",
         headers: {
            ...this._headers,
            "Authorization": `Bearer ${token}`},
      }).then(this._checkErorr);
   }
}

const auth = new Auth({
   url: "https://auth.nomoreparties.co",
   headers: {
      "Content-Type": "application/json",
   },
});

export default auth;