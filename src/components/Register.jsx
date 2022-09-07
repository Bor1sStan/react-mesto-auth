import React from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2 className="auth-form__title">Регистрация</h2>

      <label className="auth-form__field" htmlFor="email-input">
        <input
          className="auth-form__input"
          required
          name="email"
          id="email-input"
          placeholder="Email"
          type="email"
          minLength="2"
          maxLength="30"
          value={email}
          onChange={handleEmailChange}
        />
        <span className="auth-form__error email-input-error"></span>
      </label>

      <label className="auth-form__field" htmlFor="password-input">
        <input
          className="auth-form__input"
          required
          name="password"
          id="password-input"
          placeholder="Пароль"
          type="password"
          minLength="2"
          maxLength="30"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="auth-form__error password-input-error"></span>
      </label>

      <button className="auth-form__save-button" type="submit">
        Зарегистрироваться
      </button>
      <p className="auth-form__text">
        Уже зарегистрированы?
        <Link className="auth-form__link">Войти</Link>
      </p>
    </form>
  );
}

export default Register;