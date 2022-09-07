export const BASE_URL = "https://api.nomoreparties.co";

export function checkError(res) {
   if(res.ok) {
      return res.json();
   }
   return Promise.reject("Ой, ошибочка..." + res.status);
};

export const regist = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then((res) => checkError(res))
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then((res) => checkError(res))
};

export const checkToken = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         "Accept": "application/json",
         "Content-Type": "application/json",
         "Authorization": `Bearer ${token}`,
      })
   })
   .then((res) => checkError(res))
};