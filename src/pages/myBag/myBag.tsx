import { useEffect, useState } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { getCart } from '../../lib/flow/getCart';
import './myBag.scss';
import ItemInBag from './itemInBag';

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

  return (
    <section className="cartSection">
      <div className="cartWrap">
        <div className="itemsWrap">
          <ul className="itemsList">
            {cart ? (
              cart.lineItems.map((item) => (
                <li key={item.id}>
                  <ItemInBag item={item} />
                </li>
              ))
            ) : (
              <li>loading</li>
            )}
          </ul>
        </div>
        <div className="summeryList">
          <h2 className="summeryH2">Order summery</h2>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Subtotal</span>
            <span className="pricesBlock_value">
              ${cart ? (cart.totalPrice.centAmount / 100).toFixed(2) : 0}
            </span>
          </div>
          <div className="pricesBlock">
            <span className="pricesBlock_name">Delivery</span>
            <span className="pricesBlock_value">${deliveryPrice}</span>
          </div>
          <div className="summeryLine"></div>
          <div className="pricesBlock">
            <span className="pricesBlock_name name_total">Total</span>
            <span className="pricesBlock_value value_total ">
              ${(cart ? cart.totalPrice.centAmount / 100 : 0) + deliveryPrice}
            </span>
          </div>
          <span className="summeryShipping">Estimated shipping time: 2 days</span>
        </div>
      </div>
    </section>
  );
}

export default MyBag;
