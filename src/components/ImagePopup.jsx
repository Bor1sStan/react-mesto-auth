const ImagePopup = ({ name, card, isOpen, onClose }) => {
  return (
    <article
      className={`popup popup_dark-overlay popup_type_${name} ${
        isOpen && "popup_opened"}`}
      id={`${name}-popup`}
    >
      <div className="popup__card">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h2 className="popup__name">{card.name}</h2>
      </div>
    </article>
  );
};

export default ImagePopup;
