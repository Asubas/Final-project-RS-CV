import './notFound.scss';
import img404 from '../../assets/svg/404v2.svg';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <section className="notFoundSection">
        <div className="notFoundWrap">
          <div className="notFoundCont">
            <h2 className="notFoundHead">404</h2>
            <p className="notFoundText">Looks like you were lost.</p>
            <p className="notFoundText">There no page you looking for :(</p>
          </div>
          <img src={img404} alt="Page not found" className="notFoundImg" />
        </div>
        <Link to="/" className="btn_black">
          Go Home
        </Link>
      </section>
    </>
  );
}

export default NotFound;
