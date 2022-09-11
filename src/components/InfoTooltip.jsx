import React from "react";
import SuccsesIcon from "../images/SuccecIcon.svg";
import FailIcon from "../images/FailIcon.svg";

export const InfoTooltip = ({ isOpen, onClose, succses }) => {
  return (
    <article className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__info-img"
          src={succses ? SuccsesIcon : FailIcon}
          alt={"икона успеха"}
        />
        <h2 className="popup__sub-title">
          {succses
            ? `Вы успешно зарегистрировались!`
            : "Что-то пошло не так! Попробуйте ещё раз/"}
        </h2>
      </div>
    </article>
  );
};
