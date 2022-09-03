import React from "react";
import {
  Switch,
  Redirect,
  BrowserRouter,
  Route,
  useHistory,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const history = React.useHistory();
  const token = localStorage.getItem("token");

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);

  const [removedCard, setRemovedCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
   if (token) {
    Promise.all([auth.getToken(token),api.getUserInfo(), api.getCardList()])
     
    .then(([userData, cardData, tokenData]) => {
        setEmail(tokenData.data.email);
        setPassword(tokenData.data.password);
        setCurrentUser(userData);
        setCards(cardData);
        setLoggedIn(true)
      })
      .catch((err) => console.log(err));
  }
 }, [loggedIn])

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setRemovedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .handleCardLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevState) =>
          prevState.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(event) {
    event.preventDefault();

    api
      .deleteCard(removedCard._id)
      .then((res) => {
        setCards((prevState) =>
          prevState.filter((item) => item._id !== removedCard._id)
        );
        closeAllPopups();
      })

      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userData) {
    api
      .changeUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
          setEmail("");
          setPassword("");
          history.push("/login");
      })
      .catch((err) => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Switch>
        
        <Route path="/sing-in">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
          <Login 
            onChengeEmail={handleEmailChange}
            onChengePassword={handlePasswordChange}
            onSubmit={handleLoginSubmit}
            email={email}
            password={password}
          />
          )}
        </Route>

        <Route path="/sing-up">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
          <Register />
          
          )}
        </Route>

        <ProtectedRoute
          path="/"
          component={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onClose={closeAllPopups}
          cards={cards}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleDeleteCardClick}
        />

        <Route path="*">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/sing-in" />
          )}
        </Route>
      </Switch>
      {loggedIn && (
        <>
          <Footer />
          <ImagePopup
            name="image"
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            buttonText={"Да"}
            onSubmit={handleCardDelete}
          ></PopupWithForm>
        </>
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
