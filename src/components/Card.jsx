import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete, onCardDeleteClick }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDeleteClick(card)
  }

  return (
    <article className="elements__element">
      {isOwn && (
        <button
          className="elements__delete-button"
          type="button"
          onClick={handleDelete}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="elements__image"
        onClick={handleClick}
      />

      <div className="elements__row">
        <h2 className="elements__place">{card.name}</h2>
        <div className="elements__like-container">
          <button
            onClick={handleLike}
            className={
              isLiked
                ? "elements__like-button elements__like-button_active"
                : "elements__like-button"
            }
            type="button"
          ></button>
          <p className="elements__like-meter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
};

export default Card;
