import { Link } from "react-router-dom";
import logo from "../images/Vector.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Место лого" className="header__logo" />
      <div className="header__nav-container">
        <p className="header__email">this.email</p>
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;
