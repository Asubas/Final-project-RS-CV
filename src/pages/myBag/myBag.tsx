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
import { handleDiscount } from './quanitiCart/handleDiscount';

let subTotalS: RefObject<HTMLAnchorElement>;
let subTotalM: RefObject<HTMLAnchorElement>;
let subTotal: RefObject<HTMLAnchorElement>;
let promoRef: RefObject<HTMLInputElement>;

function MyBag() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Cart | null>(null);
  const deliveryPrice = 6.55;
  subTotalS = useRef<HTMLAnchorElement>(null);
  subTotalM = useRef<HTMLAnchorElement>(null);
  subTotal = useRef<HTMLAnchorElement>(null);
  promoRef = useRef<HTMLInputElement>(null);

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

  const applyPromoCode = async () => {
    const updatedCart = await handleDiscount();
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      applyPromoCode();
    }
  };

  if (!cart) {
    return <LoadingSnippet />;
  }

  if (cart.lineItems.length === 0) {
    return <EmptyBag />;
  }

  const subtotal = (cart.totalPrice.centAmount / 100).toFixed(2);
  let subTotalDiscount = '';
  if (cart.discountOnTotalPrice) {
    subTotalDiscount = (
      cart.totalPrice.centAmount / 100 +
      cart.discountOnTotalPrice.discountedAmount.centAmount / 100
    ).toFixed(2);
  }
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
            <div className="subtotal_container">
              {subTotalDiscount ? (
                <span className="subtotal_value-discount">{subTotalDiscount}</span>
              ) : null}
              <span className="subtotal_value valueChange" ref={subTotalM}>
                {subtotal}
              </span>
              <span className="subtotal_value currency">&nbsp;USD</span>
            </div>
          </div>
          <div className="promo-container">
            <input
              className="promo-container_input"
              type="text"
              ref={promoRef}
              onKeyDown={handleKeyDown}
              placeholder="Enter promocode.."
            ></input>
            <button
              type="button"
              className="promo-container_button btn_black"
              onClick={applyPromoCode}
            >
              Apply promo code
            </button>
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
            <div className="subtotal_container">
              {subTotalDiscount ? (
                <span className="subtotal_value-discount">{subTotalDiscount}</span>
              ) : null}
              <span className="subtotal_value valueChange" ref={subTotalM}>
                {subtotal}
              </span>
              <span className="subtotal_value currency">&nbsp;USD</span>
            </div>
          </div>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Delivery</span>
            <span className="pricesBlock_value">{deliveryPrice.toFixed(2)} USD</span>
          </div>
          <div className="summeryLine"></div>
          <div className="pricesBlock">
            <span className="pricesBlock_name name_total">Total</span>
            <span className="pricesBlock_value value_total valueChange" ref={subTotal}>
              {total.toFixed(2)}
            </span>
            <span className="pricesBlock_currency value_total currency">&nbsp;USD</span>
          </div>
          <span className="summeryShipping">Estimated shipping time: 2 days</span>
        </div>
      </div>
    </section>
  );
}

export default MyBag;
export { subTotalM, subTotalS, subTotal, promoRef };
