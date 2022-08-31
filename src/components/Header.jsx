import logo from "../images/Vector.svg";

function Header() {
   return (
      <header className="header">
        <img src={logo} alt="Место лого" className="header__logo" />
      </header>
   )
}

export default Header