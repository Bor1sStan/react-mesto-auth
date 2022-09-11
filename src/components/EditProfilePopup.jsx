import { useState, useEffect, useRef, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: about,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="name-input">
        <input
          required
          name="name"
          id="name-input"
          type="text"
          className="form__input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <span className="form__error name-input-error"></span>
      </label>
      <label className="form__field" htmlFor="about-input">
        <input
          required
          name="about"
          id="about-input"
          type="text"
          className="form__input"
          placeholder="Профессиональная деятельность"
          minLength="2"
          maxLength="200"
          value={about || ""}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <span className="form__error about-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;