import './productCart.scss';
import { useContext } from 'react';
import { ProductsPageContext } from '../../../context';
import GetProductById from '../../../../../lib/getProductInfo';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  console.log(state);
  return (
    <>
      {state.results.map((product) => {
        const { id, name, masterVariant } = product;
        const { images, prices } = masterVariant;
        return (
          <div className="productsCard" key={id} onClick={() => GetProductById(id)}>
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
          </div>
        );
      })}
    </>
  );
};
export default ProductCard;
