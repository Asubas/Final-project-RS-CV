import './productCart.scss';
import { useContext } from 'react';
import { ProductsPageContext } from '../../../context';
import getProductById from '../../../../../lib/getProductInfo';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  console.log(state);
  return (
    <>
      {state.results.map((product) => {
        const { id, slug, masterVariant } = product;
        const { images, prices } = masterVariant;
        return (
          <div className="productsCard" key={id} onClick={() => getProductById(id)}>
            <ul className="productsCard-list">
              <li className="productsCard-item productsCard-item_img">
                <img src={images?.[0]?.url} width="264px" alt={slug['en-GB']} />
              </li>
              <li className="productsCard-item productsCard-item_description">
                <p>{slug['en-GB']}</p>
              </li>
              <li className="productsCard-item productsCard-item_price">
                {prices?.[1].discounted?.value.centAmount ? (
                  <span className="productsCard-item_price__discount">
                    {prices?.[1].discounted?.value.centAmount / 100}{' '}
                    {prices?.[1].discounted?.value.currencyCode}
                  </span>
                ) : null}
                {prices?.[1]?.value?.centAmount ? (
                  <span className="productsCard-item_price__clear">
                    {prices[1].value.centAmount / 100} {prices[1].value.currencyCode}
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
