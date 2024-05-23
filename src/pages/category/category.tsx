import { useLocation } from 'react-router-dom';
import { NavigateBack, NavigateForward } from '../../components/navigateBtn/navigateBtn';

function Category() {
  console.log('category page');
  const location = useLocation();

  return (
    <>
      <h2>Category {location.pathname.split('/').slice(-1)}</h2>
      <NavigateBack />
      <NavigateForward />
    </>
  );
}

export default Category;
