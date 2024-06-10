import { RefObject, useEffect, useRef, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../../lib/flow/getCart';
import './myBag.scss';
import ItemInBag from './itemInBag';
import LoadingSnippet from '../../components/loadingSnippet/loadingSnippet';
import EmptyBag from './emptyBag';
import { ClearShoppingCart } from './clearCart/clearShoppingCart';
import { useNavigate } from 'react-router-dom';
import { countRef } from '../../components/header/navBar/navBar';

let subTotalS: RefObject<HTMLAnchorElement>;
let subTotalM: RefObject<HTMLAnchorElement>;
let subTotal: RefObject<HTMLAnchorElement>;
function MyBag() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const deliveryPrice = 6.55;
  subTotalS = useRef<HTMLAnchorElement>(null);
  subTotalM = useRef<HTMLAnchorElement>(null);
  subTotal = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        let cartData;
        setTimeout(async () => {
          setTimeout(async () => {
            cartData = await getCart();
            setCart(cartData.body);
            const countProduct = cartData.body.totalLineItemQuantity;
            if (countProduct && countRef.current && countProduct > 0) {
              countRef.current.textContent = countProduct.toString();
              console.log(cartData.body);
            }
          }, 300);
        }, 300);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  if (!cart) {
    return <LoadingSnippet />;
  }

  if (cart.lineItems.length === 0) {
    return <EmptyBag />;
  }

  const subtotal = (cart.totalPrice.centAmount / 100).toFixed(2);
  const total = cart.totalPrice.centAmount / 100 + deliveryPrice;

  return (
    <section className="cartSection">
      <div className="cartWrap">
        <div className="itemsWrap">
          <ul className="itemsList">
            {cart.lineItems.map((item) => (
              <li className="itemCart" key={item.id}>
                <ItemInBag item={item} />
              </li>
            ))}
          </ul>
          <div className="summeryLine"></div>
          <div className="subtotal">
            <span className="subtotal_name">Subtotal</span>
            <span className="subtotal_value" ref={subTotalM}>
              ${subtotal}
            </span>
          </div>
          <button
            className="btn_white backToShop"
            onClick={() => {
              navigate('/collection');
            }}
          >
            back to shopping
          </button>
          <ClearShoppingCart />
        </div>
        <div className="summeryList">
          <h2 className="summeryH2">Order summery</h2>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Subtotal</span>
            <span className="pricesBlock_value" ref={subTotalS}>
              ${subtotal}
            </span>
          </div>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Delivery</span>
            <span className="pricesBlock_value">${deliveryPrice.toFixed(2)}</span>
          </div>
          <div className="summeryLine"></div>
          <div className="pricesBlock">
            <span className="pricesBlock_name name_total">Total</span>
            <span className="pricesBlock_value value_total" ref={subTotal}>
              ${total.toFixed(2)}
            </span>
          </div>
          <span className="summeryShipping">Estimated shipping time: 2 days</span>
        </div>
      </div>
    </section>
  );
}

export default MyBag;
export { subTotalM, subTotalS, subTotal };
