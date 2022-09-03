import React from 'react';
import ReactDOM, { Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Register({ onSubmit }) {
   const [email, setEmail] = React.useState({});

   return (
      <form className="form">
         <h2 className="form__title">
            Регистрация
         </h2>
         <input 
            className="form__input"
            required
            name="email"
            placeholder="Email"
            type="email"
            minLength="2"
            maxLength="30"
            onChange={(e) => {
               setEmail(e.target.value)
            }}
         />
         <input 
            className="form__input"
            required
            name="password"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="30"
            onChange={(e) => {
               setEmail(e.target.value)
            }}
         />
         <button
            className="form__save-button"
            type="submit"
            onSubmit={onSubmit}
         >
            Зарегистрироваться
         </button>
         <p className="form__subtitle" />
            Уже зарегистрированы?
         <Link className="form__sign" type="button" />
            Войти?
      </form>
   );
}

export default Register;