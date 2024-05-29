import './subCollections.scss';
import { BreadcrumbsComponent } from '../collectionComponents/breadcrumbLinks/breadBackForwComp';
import { useNavigate } from 'react-router-dom';
import {
  coffeeUrl,
  backgroundImagesCoffee,
  subcategoriesCoffee,
} from '../../../constants/coffeeCollections';
import { TeaUrlType } from '../../../constants/teaCollection';

function CoffeePage() {
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    navigate(`/collection/coffee/${key}`);
  };

  return (
    <div className="subCollectionPage">
      <BreadcrumbsComponent />
      {subcategoriesCoffee.map((category, index) => {
        const urlKey = (coffeeUrl as TeaUrlType)[Object.keys(coffeeUrl as TeaUrlType)[index]];
        return (
          <div
            className={category}
            key={`${index}-${urlKey}`}
            onClick={() => handleClick(urlKey)}
            style={{
              background: `url(${backgroundImagesCoffee[index]}) no-repeat center / cover`,
            }}
          >
            <span>{category.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
}

export { CoffeePage };
