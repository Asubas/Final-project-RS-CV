import './productCart.scss';
import { useContext } from 'react';
import { ProductsPageContext } from '../../../context';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  return (
    <>
      {state.results.map((product) => {
        const { id, slug, masterVariant } = product;
        const { images, prices } = masterVariant;
        return (
          <div className="productsCard" key={id}>
            <ul className="productsCard-list">
              <li className="productsCard-item productsCard-item_img">
                <img src={images?.[0]?.url} width="264px" alt={slug['en-GB']} />
              </li>
              <li className="productsCard-item productsCard-item_description">
                <p>{slug['en-GB']}</p>
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
          </div>
        );
      })}
    </>
  );
};
export default ProductCard;
