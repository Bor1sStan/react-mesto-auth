import logo from "../images/Vector.svg";

function Header( {text, authButton} ) {
   return (
      <header className="header">
        <img src={logo} alt="Место лого" className="header__logo" />
        <button 
         className="header__button"
         type='button'
         onSubmit={authButton}
        >
         {text}
         </button>
      </header>
   )
}

export default Header