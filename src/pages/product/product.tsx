import { useParams, useLocation } from 'react-router-dom';
import { NavigateBack, NavigateForward } from '../../components/navigateBtn/navigateBtn';

function Product() {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      <h1>Product page {id}</h1>
      <h2>path to page: {location.pathname}</h2>
      <NavigateBack />
      <NavigateForward />
    </>
  );
}

export default Product;
