import { LineItem } from '@commercetools/platform-sdk';
import './myBag.scss';

type ItemInBagProps = {
  item: LineItem;
};

const ItemInBag: React.FC<ItemInBagProps> = ({ item }) => {
  const imageUrl = item.variant.images?.[0]?.url;

  return (
    <div className="itemBlock">
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
            <button className="itemDigits_quantity__btn decrease"></button>
            <span className="itemDigits_quantity__count">{item.quantity}</span>
            <button className="itemDigits_quantity__btn increase"></button>
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
