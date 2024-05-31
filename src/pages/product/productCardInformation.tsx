import './productCardInformation.scss';
import MyButton from '../../components/button/button';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ProductCard } from '../collections/collectionComponents/productsSection/productCard/productCard';
import Products from '../collections/collectionComponents/productsSection/productsSection';
import Slider from '../homePage/slider/slider';
import Carousel from 'react-multi-carousel';
import { category } from '../homePage/slider/sliderData';
import categoryP from './productCardCategorySlider';

let productName: string;
function DisplayProductInformation() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1280 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1100, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };
  const [productPack, setProductPack] = useState<number>(0);
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
  const productName = product.masterData.current.name['en-GB'];
  const productDescription = product.masterData.current.description?.['en-GB'];
  const productImage = product.masterData.current.masterVariant.images[0]?.['url'];
  const productPrice50 = product.masterData.current.masterVariant.prices[0]?.['value'].centAmount;
  const productPriceFirstLoad =
    Number(productPrice50) / 100 === Math.trunc(Number(productPrice50) / 100)
      ? `${Number(productPrice50) / 100}.00`
      : `${(Number(productPrice50) / 100).toFixed(1)}0`;
  console.log(productPrice50);
  const productPrice100 = product.masterData.current.variants[0].prices[0]?.['value'].centAmount;
  console.log(productPrice100);
  const productPrice170 = product.masterData.current.variants[1].prices[0]?.['value'].centAmount;
  console.log(productPrice170);
  const productOrigin = product.masterData.current.masterVariant.attributes[6].value;
  const productIngredients = product.masterData.current.masterVariant.attributes[1].value;
  const productServingSize = product.masterData.current.masterVariant.attributes[2].value;
  const productWaterTemperature = product.masterData.current.masterVariant.attributes[3].value;
  const productSteepingTime = product.masterData.current.masterVariant.attributes[4].value;
  const productFlavor = product.masterData.current.masterVariant.attributes[7].value;
  const productFullDescription = product.masterData.current.masterVariant.attributes[0].value;

  const imagesSlider = product.masterData.current.masterVariant.images;

  const productPrice = [productPrice50, productPrice100, productPrice170];
  const priceField = document.querySelector('.price') as HTMLParagraphElement;

  const handleClickProdPack = (e: React.MouseEvent<HTMLDivElement>) => {
    const prodPack = e.currentTarget;
    const prodPackParent = prodPack.parentNode?.childNodes;
    const priceField = document.querySelector('.price') as HTMLParagraphElement;
    const activeProdPack = document.querySelector('.variant-active');
    activeProdPack?.classList.remove('variant-active');
    prodPack.classList.add('variant-active');
    console.log(prodPack);
    let selectedPrice = 0;
    prodPackParent?.forEach((el, i) =>
      (el as HTMLElement).classList.contains('variant-active')
        ? (selectedPrice = productPrice[i])
        : '',
    );
    const productPriceFinal =
      Number(selectedPrice) / 100 === Math.trunc(Number(selectedPrice) / 100)
        ? `${Number(selectedPrice) / 100}.00`
        : `${(Number(selectedPrice) / 100).toFixed(1)}0`;

    if (priceField) {
      priceField.innerText = `$ ${productPriceFinal}`;
    }
  };

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
              <p>{`Origin: ${productOrigin}`}</p>
            </div>
            <div className="information information-flavor">
              <img src="/src/assets/svg/icon-eco.svg" alt="icon-eco" />
              <p>Flavor: {`${productFlavor}`}</p>
            </div>
          </div>
          <p className="price">{`$ ${productPriceFirstLoad}`}</p>
          <div className="product-variants__block">
            <p>Variants</p>
            <div className="variants">
              <div className="variant variant-1 variant-active" onClick={handleClickProdPack}>
                <img src="/src/assets/svg/size-50.svg" alt="size-50" />
                <p></p>
              </div>
              <div className="variant variant-2" onClick={handleClickProdPack}>
                <img src="/src/assets/svg/size-100.svg" alt="size-100" />
                <p></p>
              </div>
              <div className="variant variant-3" onClick={handleClickProdPack}>
                <img src="/src/assets/svg/size-170.svg" alt="size-170" />
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
                <b>SERVING SIZE:</b> {`${productServingSize}`}
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src="/src/assets/svg/icon-water_voc.svg" alt="icon-water-voc" />
              <p className="list-point__text">
                {' '}
                <b>WATER TEMPERATURE:</b> {`${productWaterTemperature}`}
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src="/src/assets/svg/icon-alarm.svg" alt="icon-alarm" />
              <p className="list-point__text">
                {' '}
                <b>STEEPING TIME:</b> {`${productSteepingTime}`}
              </p>
            </li>
          </ul>
        </div>
        <div className="about-tea__container">
          <h3 className="about-tea__title">About this tea</h3>
          <div className="about-tea-full-discription">
            <p>{`${productFullDescription}`}</p>
          </div>
          <div className="product-ingredient">
            <h3>Ingredient</h3>
            <p>{`${productIngredients}`}</p>
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
            <Carousel
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={['tablet', 'mobile']}
            >
              {categoryP(imagesSlider)}
            </Carousel>
            <h3>{productName}</h3>
            <p>{productDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export { DisplayProductInformation };
