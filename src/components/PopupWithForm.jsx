const PopupWithForm = ({
  name,
  title,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) => {
  return (
    <article
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      id={`${name}-popup`}
    >
      <div className="popup__container">
        <form
          className="form"
          noValidate
          id={`form-${name}`}
          onSubmit={onSubmit}
        >
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          ></button>

          <h2 className="form__title">{title}</h2>

          {children}

          <button
            className="form__save-button"
            id={`${name}-submit-button`}
            type="submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </article>
  );
};

export default PopupWithForm;
