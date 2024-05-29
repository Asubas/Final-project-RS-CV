import './productCardInformation.scss';
import MyButton from '../../components/button/button';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ProductCard } from '../collections/collectionComponents/productsSection/productCard/productCard';
import Products from '../collections/collectionComponents/productsSection/productsSection';

let productName: string;
function DisplayProductInformation() {
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonType = e.currentTarget.textContent?.trim();
    if (buttonType === '-') {
      setProductQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
    } else if (buttonType === '+') {
      setProductQuantity((prevQuantity) => prevQuantity + 1);
    }
  };
  const location = useLocation();
  const product = location.state;
  console.log(product);
  const productName = product.masterData.current.name['en-US'];
  const productDescription = product.masterData.current.description?.['en-US'];
  const productImage = product.masterData.current.masterVariant.images[0]?.['url'];
  const productPriceUs = product.masterData.current.masterVariant.prices[2]?.['value'].centAmount;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="product-card__container">
      {/* <h2>path to page: {location.pathname}</h2> */}
      <div className="product-card__block">
        <div className="product-image" onClick={openModal}>
          <img src={`${productImage}`} alt="product-image" />
        </div>
        <div className="product-parameters">
          <h3>{`${productName}`}</h3>
          <p>{`${productDescription}`}</p>
          <div className="information-about-the-origin-of-the-goods">
            <div className="information information-country">
              <img src="/src/assets/svg/icon-language.svg" alt="icon-language" />
              <p>Origin: Iran</p>
            </div>
            <div className="information information-origin">
              <img src="/src/assets/svg/icon-redeem.svg" alt="icon-reddem" />
              <p>Organic</p>
            </div>
            <div className="information information-food-category">
              <img src="/src/assets/svg/icon-eco.svg" alt="icon-eco" />
              <p>Vegan</p>
            </div>
          </div>
          <p className="price">
            <b>{`€${productPriceUs}`}</b>
          </p>
          <div className="product-variants__block">
            <p>Variants</p>
            <div className="variants">
              <div className="variant variant-1">
                <img src="/src/assets/svg/size-50.svg" alt="size-50" />
                <p></p>
              </div>
              <div className="variant variant-2">
                <img src="/src/assets/svg/size-100.svg" alt="size-100" />
                <p></p>
              </div>
              <div className="variant variant-3">
                <img src="/src/assets/svg/size-170.svg" alt="size-170" />
                <p></p>
              </div>
              <div className="variant variant-4">
                <img src="/src/assets/svg/size-sample.svg" alt="size-sampler" />
                <p></p>
              </div>
            </div>
          </div>
          <div className="product-quntity-and-add-to-bag__block">
            <div className="product-quantity">
              <MyButton className="btn_transparent " type="button" onClick={handleClick}>
                {' '}
                -
              </MyButton>
              <p className="product-quantity__count">{`${productQuantity}`}</p>
              <MyButton className="btn_transparent " type="button" onClick={handleClick}>
                {' '}
                +
              </MyButton>
            </div>
            <MyButton className="btn_black btn_product-card" type="button">
              {' '}
              ADD TO BAG
            </MyButton>
          </div>
        </div>
      </div>

      <div className="steeping-instruction-and-about-tea-block">
        <div className="stepping-instruction__container">
          <h3 className="stepping-instruction__title">Steeping instruction</h3>
          <ul className="steeping-instruction__list">
            <li className="list-point">
              <img src="/src/assets/svg/icon-kettle.svg" alt="icon-kettle" />
              <p className="list-point__text">
                {' '}
                <b>SERVING SIZE:</b> 2 tsp per cup, 6 tsp per pot
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src="/src/assets/svg/icon-water_voc.svg" alt="icon-water-voc" />
              <p className="list-point__text">
                {' '}
                <b>WATER TEMPERATURE:</b> 100°C
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src="/src/assets/svg/icon-alarm.svg" alt="icon-alarm" />
              <p className="list-point__text">
                {' '}
                <b>STEEPING TIME:</b> 3 - 5 minutes
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src="/src/assets/svg/icon-color.svg" alt="icon-color" />
              <p className="list-point__text">
                <b>COLOR</b> AFTER 3 MINUTES
              </p>
            </li>
          </ul>
        </div>
        <div className="about-tea__container">
          <h3 className="about-tea__title">About this tea</h3>
          <ul className="about-tea__list">
            <li className="about-tea__list-point">
              <h4>FLAVOR</h4>
              <p>Spicy</p>
            </li>
            <li className="about-tea__list-point">
              <h4>QUALITIES</h4>
              <p>Smoothing</p>
            </li>
            <li className="about-tea__list-point">
              <h4>CAFFEINE</h4>
              <p>Medium</p>
            </li>
            <li className="about-tea__list-point">
              <h4>ALLERGENS</h4>
              <p>Nuts-free</p>
            </li>
          </ul>
          <div className="product-ingredient">
            <h3>Ingredient</h3>
            <p>
              Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks,
              Cardamom, Cinnamon pieces.
            </p>
          </div>
        </div>
      </div>

      <div className="similar-products__container">
        <h3 className="similar-products__title">You may also like</h3>
       
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={`${productImage}`} alt="product-modal-image" />
            <h3>{productName}</h3>
            <p>{productDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { DisplayProductInformation };
