import './header.scss';
import NavBar from './navBar/navBar';

function Header() {
  return (
    <>
      <header className="header">
        <div className="headerWrap">
          <NavBar />
        </div>
      </header>
    </>
  );
}

export default Header;
