import { Link, useLocation } from 'react-router-dom';
import { NavigateBack, NavigateForward } from '../../components/navigateBtn/navigateBtn';

function Category() {
  const location = useLocation();

  return (
    <>
      <h2>Category {location.pathname.split('/').slice(-1)}</h2>
      <NavigateBack />
      <NavigateForward />
      <Link to="1">to product 1</Link>
    </>
  );
}

export default Category;
