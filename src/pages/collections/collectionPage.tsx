import { Link } from 'react-router-dom';
import './collectionPage.scss';
import { ChooseCategory } from './collectionComponents/collectionChoose/componentsChooseCategory';
import { BreadcrumbsComponent } from './collectionComponents/breadcrumbLinks/breadBackForwComp';
function Collection() {
  return (
    <>
      <BreadcrumbsComponent />
      <div className="collection-page_main">
        <Link className="collection-page_link" to={`/collection/tea`}>
          <ChooseCategory className="collection_tea-page" />
        </Link>
        <Link className="collection-page_link" to={`/collection/coffee`}>
          <ChooseCategory className="collection_coffee-page" />
        </Link>
        <Link className="collection-page_link" to={`/collection/cocoa`}>
          <ChooseCategory className="collection_cocoa-page" />
        </Link>
      </div>
    </>
  );
}

export { Collection };
