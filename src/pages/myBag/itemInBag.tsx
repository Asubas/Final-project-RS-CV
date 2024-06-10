import { LineItem } from '@commercetools/platform-sdk';
import './myBag.scss';
import { addProduct } from './quanitiCart/addProduct';
import { decProduct } from './quanitiCart/decProduct';
import { useState } from 'react';
import { countRef } from '../../components/header/navBar/navBar';

type ItemInBagProps = {
  item: LineItem;
};

const ItemInBag: React.FC<ItemInBagProps> = ({ item }: ItemInBagProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const imageUrl = item.variant.images?.[0]?.url;

  const handleDecreaseQuantity = (countProduct: number, id: string) => {
    decProduct(countProduct, id).then((response) => {
      if (response && response.statusCode === 200) {
        setQuantity(quantity - 1);
        if (countRef.current && response.body.totalLineItemQuantity) {
          countRef.current.textContent = response.body.totalLineItemQuantity.toString();
        }
      }
    });
  };

  const handleIncreaseQuantity = (countProduct: number, id: string) => {
    addProduct(countProduct, id).then((response) => {
      if (response && response.statusCode === 200) {
        setQuantity(quantity + 1);
        if (countRef.current && response.body.totalLineItemQuantity) {
          countRef.current.textContent = response.body.totalLineItemQuantity.toString();
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
          <span className="itemDigits_price">
            ${(item.price.value.centAmount / 100).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ItemInBag;
