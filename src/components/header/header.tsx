import { Link } from 'react-router-dom';
import './header.scss';
import logoSearch from '../../assets/svg/icon-search.svg';
import logoUser from '../../assets/svg/icon-person.svg';
import logoCart from '../../assets/svg/icon-local_mall.svg';

function Header() {
  return (
    <>
      <header className="header">
        <Link className="brand" to="/">
          Monkey Tea
        </Link>
        <nav className="nav">
          <Link className="nav_link btn_blank" to="/collection">
            tea collection
          </Link>
          <Link className="nav_link btn_blank" to="/about">
            about us
          </Link>
        </nav>
        <div className="user-btns">
          <Link className="user-btns_btn" to="">
            <img className="user-btns_btn__icon" src={logoSearch} />
          </Link>
          <Link className="user-btns_btn" to="account">
            <img className="user-btns_btn__icon" src={logoUser} />
          </Link>
          <Link className="user-btns_btn" to="bag">
            <img className="user-btns_btn__icon" src={logoCart} />
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
