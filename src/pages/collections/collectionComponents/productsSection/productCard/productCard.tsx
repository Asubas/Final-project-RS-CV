import './productCart.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProductsPageContext } from '../../../context';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductById } from '../../../../../lib/resquests/getProductInfo';
import { addProductToCart } from '../../../../../lib/flow/createCart';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { getCart } from '../../../../../lib/flow/getCart';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  const buttonBug = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  const [arrActiveCarts, setArrActiveCarts] = useState<Cart['lineItems']>([]);

  useEffect(() => {
    getCart().then((response) => {
      if (response.statusCode === 200) {
        setArrActiveCarts(response.body.lineItems);
        setAddedProductIds(response.body.lineItems.map((item) => item.id));
      }
    });
  }, []);

  const handleClick = (id: string) => {
    getProductById(id).then((res) => {
      if (res.statusCode === 200) {
        const currentUrl = location.pathname;
        const path = res.body.masterData.current.slug['en-GB'];
        navigate(`${currentUrl}/${path}`, { state: res.body });
      }
    });
  };

  const handleClickBug = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    event.stopPropagation();
    addProductToCart(id).then((res: ClientResponse<Cart> | undefined) => {
      if (res && res.statusCode === 200) {
        setArrActiveCarts((prevCarts) => [...prevCarts, res.body.lineItems[0]]);
        setAddedProductIds((prevIds) => [...prevIds, id]);
      }
    });
  };
  console.log(arrActiveCarts);

  return (
    <>
      {state.results.map((product) => {
        const { id, name, masterVariant, description } = product;
        const { images, prices } = masterVariant;
        const isProductAddedToCart = addedProductIds.includes(id);
        return (
          <div className="productsCard" key={id} onClick={() => handleClick(id)}>
            <button
              key={id}
              className={`productsCard_button-add ${isProductAddedToCart ? 'productAdded' : ''}`}
              type="button"
              ref={buttonBug}
              onClick={(event: React.MouseEvent<HTMLElement>) => handleClickBug(event, id)}
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
