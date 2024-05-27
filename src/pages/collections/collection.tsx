import { Link } from 'react-router-dom';
import { NavigateBack, NavigateForward } from '../../components/navigateBtn/navigateBtn';

function Collection() {
  return (
    <>
      <h1>Collection</h1>
      <NavigateBack />
      <NavigateForward />
      <Link to="tea">to categories</Link>
    </>
  );
}

export default Collection;
