import { Link } from 'react-router-dom';
import './collectionPage.scss';
import { ChooseCategory } from './collectionComponents/collectionChoose/componentsChooseCategory';
import { pathMap } from '../../constants/pathMap';

function Collection() {
  return (
    <>
      <div className="collection-page_main">
        <Link
          className="collection-page_link"
          to={`/collection/${pathMap['caf2b3c5-799e-4d6e-860c-363bf2d6542b']}`}
        >
          <ChooseCategory className="collection_tea-page" />
        </Link>
        <Link
          className="collection-page_link"
          to={`/collection/${pathMap['86625d6c-fcb0-4f8d-a58f-9f67cc8b13a4']}`}
        >
          <ChooseCategory className="collection_coffee-page" />
        </Link>
        <Link
          className="collection-page_link"
          to={`/collection/${pathMap['7a2657a3-ae01-452b-8e33-edb51503dceb']}`}
        >
          <ChooseCategory className="collection_cocoa-page" />
        </Link>
        <Link to={`/collection/${pathMap['608ca2b6-ea06-4e5c-b6d6-5a8ae2724903']}`}>kitchen</Link>
      </div>
    </>
  );
}

export default Collection;
