import { useEffect, useContext } from "react";
import avatar from "../images/Avatar.svg";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onClose,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
  onCardDeleteClick
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__menu">
          <div className="profile__container">
            <img
              className="profile__avatar"
              id="avatar"
              name="avatar"
              src={currentUser.avatar || avatar}
              alt="Заглушка"
            />
            <div className="profile__avatar-overlay">
              <button
                className="profile__avatar-edit-button"
                id="avatar-edit-button"
                type="button"
                onClick={onEditAvatar}
              ></button>
            </div>
          </div>

          <div className="profile__info">
            <div className="profile__high-row">
              <h1 className="profile__name" id="name" name="name">
                {currentUser.name}
              </h1>
              <button
                className="profile__edit-button"
                id="edit-button"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job" id="about" name="about">
              {currentUser.about}
            </p>
          </div>
        </div>

        <button
          className="profile__add-button"
          id="add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onClose={onClose}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardDeleteClick={onCardDeleteClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
