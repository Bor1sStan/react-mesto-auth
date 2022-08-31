import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={"Создать"}
    >
      <label className="form__field" htmlFor="place-input">
        <input
          required
          name="name"
          id="place-input"
          type="text"
          className="form__input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span className="form__error place-input-error"></span>
      </label>

      <label htmlFor="link-input" className="form__field">
        <input
          required
          name="link"
          id="link-input"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <span className="form__error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
