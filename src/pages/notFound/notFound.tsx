import './notFound.scss';
import img404 from '../../assets/svg/404v2.svg';

function NotFound() {
  return (
    <>
      <section className="notFoundWrap">
        <div className="notFoundCont">
          <h2 className="notFoundHead">404</h2>
          <p className="notFoundText">Looks like you were lost.</p>
          <p className="notFoundText">There no page you looking for :(</p>
        </div>
        <img src={img404} alt="Page not found" className="notFoundImg" />
      </section>
    </>
  );
}

export default NotFound;
