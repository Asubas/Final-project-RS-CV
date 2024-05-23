import { useLocation } from 'react-router-dom';

function Category() {
  console.log('category page');
  const location = useLocation();

  return (
    <>
      <h2>Category {location.pathname.split('/').slice(-1)}</h2>
    </>
  );
}

export default Category;
