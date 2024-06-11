import { LineItem } from '@commercetools/platform-sdk';
import './myBag.scss';
import { addProduct } from './quanitiCart/addProduct';
import { decProduct } from './quanitiCart/decProduct';
import { useState } from 'react';
import { countRef } from '../../components/header/navBar/navBar';
import { subTotal, subTotalM, subTotalS } from './myBag';
import { removeProduct } from './quanitiCart/removeProduct';

type ItemInBagProps = {
  item: LineItem;
};

const ItemInBag: React.FC<ItemInBagProps> = ({ item }: ItemInBagProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [priced, setPrice] = useState(item.price.value.centAmount);
  const [discPrice, setDiscPrice] = useState(item.price.discounted?.value.centAmount);
  const imageUrl = item.variant.images?.[0]?.url;
  const [isRemoved, setIsRemoved] = useState(false);

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
          subTotalM.current.textContent = (response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotalS.current.textContent = (response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotal.current.textContent = (6.55 + response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
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
          subTotalM.current.textContent = (response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotalS.current.textContent = (response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotal.current.textContent = (6.55 + response.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
        }
      }
    });
  };

  const handleRemoveProduct = (quantityLine: number, idLine: string) => {
    removeProduct(quantityLine, idLine).then((resRemove) => {
      if (resRemove && resRemove.statusCode === 200) {
        if (countRef.current && resRemove.body.totalLineItemQuantity) {
          countRef.current.textContent = resRemove.body.totalLineItemQuantity.toString();
        } else if (countRef.current && !resRemove.body.totalLineItemQuantity) {
          countRef.current.textContent = '';
        }
        if (subTotalM.current && subTotalS.current && subTotal.current) {
          subTotalM.current.textContent = (resRemove.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotalS.current.textContent = (resRemove.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
          subTotal.current.textContent = (6.55 + resRemove.body.totalPrice.centAmount / 100)
            .toFixed(2)
            .toString();
        }
        setIsRemoved(true);
      }
    });
  };

  return (
    <div className={`itemBlock ${quantity === 0 || isRemoved ? 'hidden' : ''}`} key={item.id}>
      <img src={imageUrl} alt={item.name['en-GB']} className="itemImg" />
      <div className="itemData">
        <div className="itemDisc">
          <p className="itemDisc_name">{item.name['en-GB']}</p>
          <button
            className="btn_blank itemDisc_btn"
            type="button"
            onClick={() => {
              handleRemoveProduct(quantity, item.id);
            }}
          >
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
