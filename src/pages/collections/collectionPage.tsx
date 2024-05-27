import { Link } from 'react-router-dom';
import './collectionPage.scss';

function Collection() {
  return (
    <>
      <Link to="tea">Tea</Link>
      <Link to="coffee">Coffee</Link>
      <Link to="cocoa">Cocoa</Link>
    </>
  );
}

export default Collection;
