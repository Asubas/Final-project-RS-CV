import { RefObject, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logoCart from '../../../assets/svg/icon-local_mall.svg';
import SearchBtn from '../searchBtn/SearchBtn';

let loginRef: RefObject<HTMLAnchorElement>;

function NavBar() {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  loginRef = useRef<HTMLAnchorElement>(null);
  const checkIsUserLoggedIn = () => {
    const userId = localStorage.getItem('userId');
    setIsUserLoggedIn(!!userId);
  };

  const handleStorageChange = () => {
    checkIsUserLoggedIn();
  };

  useEffect(() => {
    checkIsUserLoggedIn();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  });

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

  const handleOutsideClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setBurgerClass('burger-bar unclicked');
      setMenuClass('menu hidden');
      setIsMenuClicked(false);
    }
  };

  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuClicked]);

  return (
    <>
      <Link className="brand" to="/">
        Monkey Tea
      </Link>
      <SearchBtn />
      <nav className={menuClass} ref={menuRef}>
        <div className="page-links">
          <Link className="nav_link btn_blank" to="/collection">
            tea collection
          </Link>
          <Link className="nav_link btn_blank" to="/about">
            about us
          </Link>
        </div>
        <div className="user-btns">
          <Link className="user-btns_btn" to="bag">
            <img className="user-btns_btn__icon" src={logoCart} alt="Cart" />
          </Link>
          <Link className="btn_white btn_header" to={isUserLoggedIn ? '/' : 'login'} ref={loginRef}>
            {isUserLoggedIn ? 'Log out' : 'Sign In'}
          </Link>
          <Link className="btn_black btn_header" to="registration">
            Sign Up
          </Link>
        </div>
      </nav>
      <div className="burger-menu" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    </>
  );
}

export { NavBar, loginRef };
