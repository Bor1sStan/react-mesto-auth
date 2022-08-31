import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose}) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: `${inputRef.current.value}`,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="form__field" htmlFor="avatar-input">
        <input
          required
          name="avatar"
          id="avatar-input"
          type="url"
          className="form__input"
          placeholder="Ссылка на картинку"
          ref={inputRef}
        />
        <span className="form__error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;