import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Register from "./Register";
import Login from "./Login";
import { InfoTooltip } from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import { auth } from "../utils/auth";

function App() {
  const token = localStorage.getItem("token");
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [succses, setSuccses] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);

  const [cards, setCards] = React.useState([]);
  const [removedCard, setRemovedCard] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    if (token) {
      auth
        .getToken(token)
        .then((data) => {
          setIsLoggedIn(true);
          setEmail(data.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
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

  function handleRegisterSubmit(e) {
    e.preventDefault();

    auth
      .regist(password, email)
      .then((res) => {
        if (res) {
          console.log(res);
          setEmail("");
          setPassword("");
          history.push("/sign-in");
          setSuccses(true);
          setIsInfoTooltipPopupOpen(true);
        } else {
          setSuccses(false)
          setIsInfoTooltipPopupOpen(true);
          console.log("НЕ ТАК РЕГИСТР!");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    auth
      .login(password, email)
      .then((data) => {
        if (data) {
          console.log(data);
          setPassword("");
          localStorage.setItem("token", data.token);
          history.push("/");
          setIsLoggedIn(true);
        } else {
          console.log("НЕ ТАК ЛОГИН!");
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccses(false)
        setIsInfoTooltipPopupOpen(true);
      })
  }

  function goHome() {
    localStorage.removeItem("token");
    history.push("/sign-in");
    setIsLoggedIn(false);
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onExit={goHome} isLoggedIn={isLoggedIn} />
      <Switch>
        <Route path="/sign-in">
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <Login
              email={email}
              password={password}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
              onSubmit={handleLoginSubmit}
            />
          )}
        </Route>

        <Route path="/sign-up">
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <Register
              onSubmit={handleRegisterSubmit}
              email={email}
              password={password}
              onEmailChange={handleEmailChange}
              onPasswordChange={handlePasswordChange}
            />
          )}
        </Route>

        <ProtectedRoute
          path="/"
          isLoggedIn={isLoggedIn}
          component={Main}
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
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
      {isLoggedIn && (
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
      {!isLoggedIn && (
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          succses={succses}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
