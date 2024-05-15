import { Link } from 'react-router-dom';
import './header.scss';
import NavBar from './navBar/navBar';

function Header() {
  return (
    <>
      <header className="header">
        <Link className="brand" to="/">
          Monkey Tea
        </Link>
        <NavBar />
      </header>
    </>
  );
}

export default Header;
