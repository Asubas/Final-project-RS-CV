import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../../lib/flow/getCart';
import './myBag.scss';
import ItemInBag from './itemInBag';
import LoadingSnippet from '../../components/loadingSnippet/loadingSnippet';
import EmptyBag from './emptyBag';

function MyBag() {
  const [cart, setCart] = useState<Cart | null>(null);
  const deliveryPrice = 6.55;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        setCart(cartData.body);
        console.log(cartData.body);
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
            <span className="subtotal_value">${subtotal}</span>
          </div>
          <button className="btn_white backToShop">back to shopping</button>
        </div>
        <div className="summeryList">
          <h2 className="summeryH2">Order summery</h2>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Subtotal</span>
            <span className="pricesBlock_value">${subtotal}</span>
          </div>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Delivery</span>
            <span className="pricesBlock_value">${deliveryPrice.toFixed(2)}</span>
          </div>
          <div className="summeryLine"></div>
          <div className="pricesBlock">
            <span className="pricesBlock_name name_total">Total</span>
            <span className="pricesBlock_value value_total">${total.toFixed(2)}</span>
          </div>
          <span className="summeryShipping">Estimated shipping time: 2 days</span>
        </div>
      </div>
    </section>
  );
}

export default MyBag;
