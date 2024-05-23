import { useParams, useLocation } from 'react-router-dom';

function Product() {
  console.log('product page');

  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      <h1>Product page {id}</h1>
      <h2>path to page: {location.pathname}</h2>
    </>
  );
}

export default Product;
