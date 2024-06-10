import './productCart.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProductsPageContext } from '../../../context';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProductById } from '../../../../../lib/resquests/getProductInfo';
import { addProductToCart } from '../../../../../lib/flow/createCart';
import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { getCart } from '../../../../../lib/flow/getCart';
import { LoadingModal } from '../../../../../components/loadingSnippet/loadingFetchProduct/loadingModal';
import { countRef } from '../../../../../components/header/navBar/navBar';

const ProductCard = () => {
  const { state } = useContext(ProductsPageContext);
  const buttonBug = useRef<HTMLButtonElement>(null);
  const [loadingState, setLoadingState] = useState<{ [key: string]: boolean }>({});

  const location = useLocation();
  const navigate = useNavigate();
  const [addedProductIds, setAddedProductIds] = useState<string[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setTimeout(async () => {
        await getCart().then((response) => {
          if (response.statusCode === 200) {
            setAddedProductIds(response.body.lineItems.map((item) => item.productId));
            if (countRef.current) {
              countRef.current.textContent = response.body.lineItems.length.toString();
            }
          }
        });
      }, 500);
    }, 300);
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
    setLoadingState((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    addProductToCart(id)
      .then((res: ClientResponse<Cart> | undefined) => {
        if (res && res.statusCode === 200) {
          setAddedProductIds((prevIds) => [...prevIds, id]);
          if (
            (countRef.current?.textContent &&
              countRef.current?.textContent !== res.body.lineItems.length.toString()) ||
            countRef.current?.textContent === ''
          ) {
            if (res.body.lineItems.length === 0 && !countRef.current.classList.contains('empty')) {
              countRef.current.classList.add('empty');
            }
            if (res.body.lineItems.length > 99) countRef.current.classList.add('min-width');
            countRef.current.classList.remove('empty');
            countRef.current.textContent = res.body.lineItems.length.toString();
          }
        }
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingState((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        }, 1500);
      });
  };

  return (
    <>
      {state.results.map((product) => {
        const { id, name, masterVariant, description } = product;
        const { images, prices } = masterVariant;
        return (
          <div className="productsCard" key={id} onClick={() => handleClick(id)}>
            {loadingState[id] && <LoadingModal />}
            <button
              key={id}
              className={`productsCard_button-add ${addedProductIds.includes(id) ? 'productAdded' : ''}`}
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
