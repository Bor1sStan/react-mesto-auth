import React from "react";

import logo from "../images/Vector.svg";
import closeButton from "../images/Close-icon.svg";
import burger from "../images/Burger.svg";

import HeaderNavContainer from "./HeaderNavContainer";

function Header({ email, loggedIn, onExit }) {
  const [width, setWidth] = React.useState(0);
  const [showMenu, setShowMenu] = React.useState(false);

  function resize() {
    setWidth(window.innerWidth);
    if (width <= 480) {
      setShowMenu(true);
    }
    if (width > 480) {
      setShowMenu(false)
    }
  }

  function menuClick() {
    setShowMenu(!showMenu);
  }

  React.useEffect(() => {
    window.addEventListener("resize", resize);
    setWidth(window.innerWidth);

    return() => {
      window.removeEventListener("resize", resize)
    }
  }, [width]);

  return (
    <>
    {showMenu && loggedIn && (
      <HeaderNavContainer
      isLoggedIn={loggedIn}
      email={email}
      onExit={onExit}
      width={width}
      />
    )}
      <header className="header">
        <img src={logo} alt="Место лого" className="header__logo" />
        {width <= 480 && loggedIn ? (
          <img
            className={"header__burger"}
            style={{
                   width: "20px",
                   height: "20px",
                   paddingRight: "30px",
                   paddingTop: "7px"
            }}
            onClick={menuClick}
            src={showMenu ? closeButton : burger}
            alt={showMenu ? "Закрыть" : "Меню"}
          />
        ) : (
          <HeaderNavContainer
            isLoggedIn={loggedIn}
            email={email}
            onExit={onExit}
          />
        )}
      </header>
    </>
  );
}

export default Header;
