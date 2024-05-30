import './breadcrumbs.scss';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((pathname) => pathname !== '');

  return (
    <nav className="breadcrumbs">
      <ol>
        <li>
          <Link className="breadcrumbs_item" to="/">
            Home/
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeLink = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLastItem = index === pathnames.length - 1;
          return (
            <li key={index}>
              {isLastItem ? (
                pathname
              ) : (
                <>
                  <Link className="breadcrumbs_item" to={routeLink}>
                    {pathname}
                  </Link>
                  <span>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
