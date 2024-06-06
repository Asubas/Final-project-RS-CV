import './productCart.scss';
import { useContext, useRef } from 'react';
import { ProductsPageContext } from '../../../context';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductById } from '../../../../../lib/resquests/getProductInfo';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  const buttonBug = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Node).contains(buttonBug.current)) {
      getProductById(id).then((res) => {
        if (res.statusCode === 200) {
          const currentUrl = location.pathname;
          const path = res.body.masterData.current.slug['en-GB'];
          navigate(`${currentUrl}/${path}`, { state: res.body });
        }
      });
    }
  };

  const handleClickBug = (event: React.MouseEvent<HTMLElement>) => {
    console.log('клик на кнопку');
    if (buttonBug.current && buttonBug.current.contains(event.target as Node)) {
      return;
    } else {
      event.stopPropagation();
    }
  };
  return (
    <>
      {state.results.map((product) => {
        const { id, name, masterVariant, description } = product;
        const { images, prices } = masterVariant;
        return (
          <div
            className="productsCard"
            key={id}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => handleClick(id, e)}
          >
            <button
              className="productsCard_button-add"
              type="button"
              ref={buttonBug}
              onClick={handleClickBug}
            />
            <ul className="productsCard-list">
              <li className="productsCard-item productsCard-item_img">
                <img src={images?.[0]?.url} width="264px" alt={name['en-GB']} />
              </li>
              <li className="productsCard-item productsCard-item_description">
                <p>{name['en-GB']}</p>
              </li>
              <li className="productsCard-item productsCard-item_price">
                {prices?.[0]?.discounted?.value?.centAmount ? (
                  <span className="productsCard-item_price__discount">
                    {prices[0].discounted.value.centAmount / 100}{' '}
                    {prices[0].discounted.value.currencyCode}
                  </span>
                ) : null}
                {prices?.[0]?.value?.centAmount ? (
                  <span className="productsCard-item_price__clear">
                    {prices[0].value.centAmount / 100} {prices[0].value.currencyCode}
                  </span>
                ) : null}
              </li>
            </ul>
            {description && (
              <div className="description_product">
                <p>{description['en-GB']}</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
export { ProductCard };
