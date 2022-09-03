import React from 'react';

function Login({ onLogin, onEmailChange, onPasswordChange, email, password }) {

   return (
      <form className="form">
         <h2 className="form__title">
            Вход
         </h2>
         <input 
            className="form__input"s
            required
            name="email"
            placeholder="Email"
            type="email"
            minLength="2"
            maxLength="30"
            value={email}
            onChange={onEmailChange}
         />
         <input 
            className="form__input"
            required
            name="password"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="30"
            value={password}
            onChange={onPasswordChange}
         />
         <button
            className="form__save-button"
            type="submit"
            onSubmit={onLogin}
         >
            Вход
         </button>
      </form>
   );
};

export default Login()