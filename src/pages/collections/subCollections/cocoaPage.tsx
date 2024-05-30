import './subCollections.scss';
import { BreadcrumbsComponent } from '../collectionComponents/breadcrumbLinks/breadBackForwComp';
import { useNavigate } from 'react-router-dom';
import {
  subcategoriesCococa,
  backgroundImagesCocoa,
  cocoaUrl,
} from '../../../constants/cocaCollections';
import { TeaUrlType } from '../../../constants/teaCollection';

function CocoaPage() {
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    navigate(`/collection/cocoa/${key}`);
  };

  return (
    <div className="subCollectionPage">
      <BreadcrumbsComponent />
      {subcategoriesCococa.map((category, index) => {
        const urlKey = (cocoaUrl as TeaUrlType)[Object.keys(cocoaUrl as TeaUrlType)[index]];
        return (
          <div
            className={category}
            key={`${index}-${urlKey}`}
            onClick={() => handleClick(urlKey)}
            style={{
              background: `url(${backgroundImagesCocoa[index]}) no-repeat center / cover`,
            }}
          >
            <span>{category.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
}

export { CocoaPage };
