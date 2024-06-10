import { RefObject, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoCart from '../../../assets/svg/icon-local_mall_black.svg';
import SearchBtn from '../searchBtn/SearchBtn';
import { toast } from 'react-toastify';
import { infoLogout } from '../../toastyOption/toastyOptions';
import { startApp } from '../../../lib/authorization/callAnonymFlow';
import { getCart } from '../../../lib/flow/getCart';

let loginRef: RefObject<HTMLAnchorElement>;
let reqRef: RefObject<HTMLAnchorElement>;
let countRef: RefObject<HTMLAnchorElement>;
function NavBar() {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);
  const pageLinksRef = useRef<HTMLDivElement>(null);
  const userBtnRef = useRef<HTMLDivElement>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [countProduct, setCountProduct] = useState(0);
  countRef = useRef<HTMLAnchorElement>(null);
  loginRef = useRef<HTMLAnchorElement>(null);
  reqRef = useRef<HTMLAnchorElement>(null);
  const checkIsUserLoggedIn = () => {
    const userId = localStorage.getItem('userId');
    setIsUserLoggedIn(!!userId);
  };

  const handleStorageChange = () => {
    checkIsUserLoggedIn();
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsUserLoggedIn(false);
    if (loginRef.current?.textContent === 'Log out') {
      localStorage.removeItem('userId');
      localStorage.removeItem('userVersion');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('anonymousCartId');
      toast.info('🎈 You are logged out of your account!', infoLogout);
      navigate('/');
      setTimeout(() => {
        startApp();
      }, 300);
    }
    if (loginRef.current) loginRef.current.textContent = 'Sign in';
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
    if (
      (menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Node).contains(burgerRef.current)) ||
      (pageLinksRef.current as HTMLDivElement).contains(event.target as Node) ||
      (userBtnRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
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
  useEffect(() => {
    const fetchCartData = async () => {
      setTimeout(async () => {
        const response = await getCart();
        setCountProduct(response.body.lineItems.length);
      }, 500);
    };
    fetchCartData();
  }, []);
  return (
    <>
      <Link className="brand" to="/">
        Monkey Tea
      </Link>
      <SearchBtn />
      <Link className="user-btns_btn" to="bag">
        <img className="user-btns_btn__icon" src={logoCart} alt="Cart" />
        {countProduct > 0 ? (
          <span
            className={`user-btns-btn__count ${countProduct > 99 ? 'min-width' : ''}`}
            ref={countRef}
          >
            {countProduct > 99 ? '99+' : countProduct}
          </span>
        ) : (
          <span className="user-btns-btn__count empty" ref={countRef}></span>
        )}
      </Link>
      <nav className={menuClass} ref={menuRef}>
        <div className="page-links" ref={pageLinksRef}>
          <Link className="nav_link btn_blank" to="/collection">
            collection
          </Link>
          <Link className="nav_link btn_blank" to="/about">
            about us
          </Link>
        </div>
        <div className="user-btns" ref={userBtnRef}>
          <Link
            className="btn_white btn_header"
            to={isUserLoggedIn ? '/' : 'login'}
            ref={loginRef}
            onClick={handleLogout}
          >
            {isUserLoggedIn ? 'Log out' : 'Sign In'}
          </Link>
          <Link
            className="btn_black btn_header"
            to={isUserLoggedIn ? 'profile' : 'registration'}
            ref={reqRef}
          >
            {isUserLoggedIn ? 'Profile' : 'Sign Up'}
          </Link>
        </div>
      </nav>
      <div className="burger-menu" ref={burgerRef} onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    </>
  );
}

export { NavBar, loginRef, reqRef, countRef };
