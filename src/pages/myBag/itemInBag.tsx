import { LineItem } from '@commercetools/platform-sdk';
import './myBag.scss';
import { addProduct } from './quanitiCart/addProduct';
import { decProduct } from './quanitiCart/decProduct';
import { useState } from 'react';
import { countRef } from '../../components/header/navBar/navBar';
import { subTotal, subTotalM, subTotalS } from './myBag';

type ItemInBagProps = {
  item: LineItem;
};

const ItemInBag: React.FC<ItemInBagProps> = ({ item }: ItemInBagProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [priced, setPrice] = useState(item.price.value.centAmount);
  const [discPrice, setDiscPrice] = useState(item.price.discounted?.value.centAmount);
  const imageUrl = item.variant.images?.[0]?.url;

  const handleDecreaseQuantity = (countProduct: number, id: string) => {
    decProduct(countProduct, id).then((response) => {
      if (response && response.statusCode === 200) {
        setQuantity(quantity - 1);
        setPrice(priced);
        setDiscPrice(discPrice);
        if (countRef.current && response.body.totalLineItemQuantity) {
          countRef.current.textContent = response.body.totalLineItemQuantity.toString();
        }
        if (subTotalM.current && subTotalS.current && subTotal.current) {
          subTotalM.current.textContent = (response.body.totalPrice.centAmount / 100).toString();
          subTotalS.current.textContent = (response.body.totalPrice.centAmount / 100).toString();
          subTotal.current.textContent = (
            6.55 +
            response.body.totalPrice.centAmount / 100
          ).toString();
        }
      }
    });
  };

  const handleIncreaseQuantity = (countProduct: number, id: string) => {
    addProduct(countProduct, id).then((response) => {
      if (response && response.statusCode === 200) {
        setQuantity(quantity + 1);
        setPrice(priced);
        setDiscPrice(discPrice);
        if (countRef.current && response.body.totalLineItemQuantity) {
          countRef.current.textContent = response.body.totalLineItemQuantity.toString();
        }
        if (subTotalM.current && subTotalS.current && subTotal.current) {
          subTotalM.current.textContent = (response.body.totalPrice.centAmount / 100).toString();
          subTotalS.current.textContent = (response.body.totalPrice.centAmount / 100).toString();
          subTotal.current.textContent = (
            6.55 +
            response.body.totalPrice.centAmount / 100
          ).toString();
        }
      }
    });
  };

  return (
    <div className={`itemBlock ${quantity === 0 ? 'hidden' : ''}`} key={item.id}>
      <img src={imageUrl} alt={item.name['en-GB']} className="itemImg" />
      <div className="itemData">
        <div className="itemDisc">
          <p className="itemDisc_name">{item.name['en-GB']}</p>
          <button className="btn_blank itemDisc_btn" type="button">
            remove
          </button>
        </div>
        <div className="itemDigits">
          <div className="itemDigits_quantity">
            <button
              className="itemDigits_quantity__btn decrease"
              type="button"
              onClick={() => {
                handleDecreaseQuantity(quantity, item.id);
              }}
            ></button>
            <span className="itemDigits_quantity__count">{quantity}</span>
            <button
              className="itemDigits_quantity__btn increase"
              onClick={() => {
                handleIncreaseQuantity(quantity, item.id);
              }}
            ></button>
          </div>
          {item.price?.discounted?.value?.centAmount && discPrice ? (
            <span className="itemDigits_price__discount">
              {(discPrice * quantity) / 100} {item.price.discounted.value.currencyCode}
            </span>
          ) : null}
          {item.price?.value?.centAmount ? (
            <span className="itemDigits_price">
              {(priced * quantity) / 100} {item.price.value.currencyCode}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ItemInBag;
