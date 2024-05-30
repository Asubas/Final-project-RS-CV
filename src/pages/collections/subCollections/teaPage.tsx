import './subCollections.scss';
import { BreadcrumbsComponent } from '../collectionComponents/breadcrumbLinks/breadBackForwComp';
import { subcategoriesTea, teaUrl, backgroundImagesTea } from '../../../constants/teaCollection';
import { useNavigate } from 'react-router-dom';
import { TeaUrlType } from '../../../constants/teaCollection';

function TeaPage() {
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    navigate(`/collection/tea/${key}`);
  };

  return (
    <div className="subCollectionPage">
      <BreadcrumbsComponent />
      {subcategoriesTea.map((category, index) => {
        const urlKey = (teaUrl as TeaUrlType)[Object.keys(teaUrl as TeaUrlType)[index]];
        return (
          <div
            className={category}
            key={`${index}-${urlKey}`}
            onClick={() => handleClick(urlKey)}
            style={{
              background: `url(${backgroundImagesTea[index]}) no-repeat center / contain`,
            }}
          >
            <span>{category.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
}

export { TeaPage };
