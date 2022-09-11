import React from "react";
import { Route, Link } from "react-router-dom";

const HeaderNavContainer = ({ email, onExit, width }) => {
  return (
    <div
      className={
        width <= 580
          ? "header__nav-container header__burger"
          : "header__nav-container"
      }
    >
      <Route exact path="/">
        <p className="header__email">{email}</p>
        <button className="header__link"  onClick={onExit}>
          Выйти
        </button>
      </Route>

      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Route>
    </div>
  );
};

export default HeaderNavContainer;
