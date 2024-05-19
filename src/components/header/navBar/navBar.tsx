import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoCart from '../../../assets/svg/icon-local_mall.svg';
import SearchBtn from '../searchBtn/SearchBtn';

function NavBar() {
  // change classes
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // toggle menu burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked');
      setMenuClass('menu visible');
    } else {
      setBurgerClass('burger-bar unclicked');
      setMenuClass('menu hidden');
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className="burger-menu" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
      <nav className={menuClass}>
        <div className="page-links">
          <Link className="nav_link btn_blank" to="/collection">
            tea collection
          </Link>
          <Link className="nav_link btn_blank" to="/about">
            about us
          </Link>
        </div>
        <div className="user-btns">
          <SearchBtn />
          <Link className="user-btns_btn" to="bag">
            <img className="user-btns_btn__icon" src={logoCart} />
          </Link>
          <Link className="btn_white btn_header" to="login">
            Log In
          </Link>
          <Link className="btn_black btn_header" to="registrtion">
            Sing In
          </Link>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
