import './productCardInformation.scss';
import MyButton from '../../components/button/button';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import categoryP, { SliderItemDataP } from './productCardCategorySlider';
import getSimilarProducts from './getSimilarProducts';
import { ProductProjection } from '@commercetools/platform-sdk';
import createSimilarProducts from './createSimilarProducts';
import { BreadcrumbsComponent } from '../collections/collectionComponents/breadcrumbLinks/breadBackForwComp';
import iconEco from '../../assets/svg/icon-eco.svg';
import size50 from '../../assets/svg/size-50.svg';
import size100 from '../../assets/svg/size-100.svg';
import size170 from '../../assets/svg/size-170.svg';
import iconKettle from '../../assets/svg/icon-kettle.svg';
import iconWaterVoc from '../../assets/svg/icon-water_voc.svg';
import iconAlarm from '../../assets/svg/icon-alarm.svg';
import iconLanguage from '../../assets/svg/icon-language.svg';
import getProductBySlug from '../../lib/resquests/getProductBySlug';

function DisplayProductInformation() {
  const responsive = {
    superLargeDesktop: {
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
  const currentURL = window.location.href;
  const indexLastSep = currentURL.lastIndexOf('/');
  const slug = currentURL.slice(indexLastSep + 1);
  const [productInfo, setProductInfo] = useState<ProductProjection | null>(null);
  const imagesSlider: SliderItemDataP[] = product?.masterData?.current.masterVariant.images;
  const [currentImg, setCurrentImg] = useState<string>(imagesSlider?.[0].url);
  const [, setIsLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<ProductProjection[]>([]);
  const IDsimilarProducts1 = product?.masterData?.current.categories[0].id;
  const IDsimilarProducts2 = product?.masterData?.current.categories[1].id;
  useEffect(() => {
    if (!product && slug) {
      getProductBySlug(slug)
        .then((p) => {
          const productResult = p.body.results?.[0];
          setProductInfo(productResult);
          setCurrentImg(productResult?.masterVariant?.images?.[0]?.url || '');

          const IDsimilarProducts11 = productResult?.categories[0].id;
          const IDsimilarProducts21 = productResult?.categories[1].id;

          getSimilarProducts(IDsimilarProducts11, IDsimilarProducts21)
            .then((res) => {
              setSimilarProducts(res.body.results);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching similar products:', error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error fetching product by slug:', error);
        });
    }
    if (product) {
      setProductInfo(product);
      setCurrentImg(product.masterData.current.masterVariant.images[0].url);

      getSimilarProducts(IDsimilarProducts1, IDsimilarProducts2)
        .then((res) => {
          setSimilarProducts(res.body.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching similar products:', error);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, slug]);

  const priceField = document.querySelector('.price') as HTMLParagraphElement;
  const priceDiscontField = document.querySelector('.price-discount') as HTMLParagraphElement;
  const productName = product?.masterData?.current?.name?.['en-GB'] || productInfo?.name['en-GB'];
  const productDescription =
    product?.masterData?.current?.description?.['en-GB'] || productInfo?.description?.['en-GB'];
  const productPrice50 =
    product?.masterData?.current?.masterVariant?.prices?.[0]?.value.centAmount ||
    productInfo?.masterVariant?.prices?.[0]?.value.centAmount;
  const productPriceFirstLoad =
    Number(productPrice50) / 100 === Math.trunc(Number(productPrice50) / 100)
      ? `${Number(productPrice50) / 100}.00`
      : `${(Number(productPrice50) / 100).toFixed(1)}0`;

  const productPrice100 =
    product?.masterData?.current.variants[0].prices[0]?.value.centAmount ||
    productInfo?.variants?.[0].prices?.[0]?.value.centAmount;
  const productPrice170 =
    product?.masterData?.current.variants[1].prices[0]?.value.centAmount ||
    productInfo?.variants?.[1].prices?.[0]?.value.centAmount;
  const productDiscontPrice50 =
    product?.masterData?.current.masterVariant.prices[0]?.discounted?.value.centAmount ||
    productInfo?.masterVariant?.prices?.[0]?.discounted?.value.centAmount;
  const productDiscontPriceFirstLoad = productDiscontPrice50
    ? Number(productDiscontPrice50) / 100 === Math.trunc(Number(productDiscontPrice50) / 100)
      ? `$ ${Number(productDiscontPrice50) / 100}.00`
      : `$ ${(Number(productDiscontPrice50) / 100).toFixed(2)}`
    : '';

  if (productDiscontPriceFirstLoad !== '') {
    priceField?.classList.add('price-cross-out');
  } else {
    if (priceField?.classList.contains('price-cross-out')) {
      priceField?.classList.remove('price-cross-out');
    }
  }

  const productDiscontPrice100 =
    product?.masterData?.current.variants[0].prices[0]?.discounted?.value.centAmount ||
    productInfo?.variants?.[0].prices?.[0]?.discounted?.value?.centAmount;

  const productDiscontPrice170 =
    product?.masterData?.current.variants[1].prices[0]?.discounted?.value.centAmount ||
    productInfo?.variants?.[1].prices?.[0]?.discounted?.value?.centAmount;

  const productOrigin =
    product?.masterData?.current.masterVariant.attributes[6].value ||
    productInfo?.masterVariant?.attributes?.[6]?.value;
  const productIngredients =
    product?.masterData?.current.masterVariant.attributes[1].value ||
    productInfo?.masterVariant?.attributes?.[1]?.value;
  const productServingSize =
    product?.masterData?.current.masterVariant.attributes[2].value ||
    productInfo?.masterVariant?.attributes?.[2]?.value;
  const productWaterTemperature =
    product?.masterData?.current.masterVariant.attributes[3].value ||
    productInfo?.masterVariant?.attributes?.[3]?.value;
  const productSteepingTime =
    product?.masterData?.current.masterVariant.attributes[4].value ||
    productInfo?.masterVariant?.attributes?.[4]?.value;
  const productFlavor =
    product?.masterData?.current.masterVariant.attributes[7].value ||
    productInfo?.masterVariant?.attributes?.[7]?.value;
  const productFullDescription =
    product?.masterData?.current.masterVariant.attributes[0].value ||
    productInfo?.masterVariant?.attributes?.[0]?.value;
  const productPriceArr = [productPrice50, productPrice100, productPrice170];
  const productDiscontPrice = [
    productDiscontPrice50,
    productDiscontPrice100,
    productDiscontPrice170,
  ];

  const handleClickProdPack = (e: React.MouseEvent<HTMLDivElement>) => {
    const prodPack = e.currentTarget;
    const prodPackParent = prodPack.parentNode?.childNodes;

    const activeProdPack = document.querySelector('.variant-active');
    activeProdPack?.classList.remove('variant-active');
    prodPack.classList.add('variant-active');

    let selectedPrice = 0;
    let selectedDiscontPrice = 0;
    prodPackParent?.forEach((el, i) => {
      if ((el as HTMLElement).classList.contains('variant-active')) {
        selectedPrice = productPriceArr[i];
        selectedDiscontPrice = productDiscontPrice[i];
      }
    });
    const productPriceFinal =
      Number(selectedPrice) / 100 === Math.trunc(Number(selectedPrice) / 100)
        ? `${Number(selectedPrice) / 100}.00`
        : `${(Number(selectedPrice) / 100).toFixed(2)}`;

    if (priceField) {
      priceField.innerText = `$ ${productPriceFinal}`;
    }

    const productDiscontPriceFinal = selectedDiscontPrice
      ? Number(selectedDiscontPrice) / 100 === Math.trunc(Number(selectedDiscontPrice) / 100)
        ? `$ ${Number(selectedDiscontPrice) / 100}.00`
        : `$ ${(Number(selectedDiscontPrice) / 100).toFixed(2)}`
      : '';

    if (productDiscontPriceFinal !== '') {
      priceField.classList.add('price-cross-out');
    } else {
      if (priceField.classList.contains('price-cross-out')) {
        priceField.classList.remove('price-cross-out');
      }
    }

    if (priceDiscontField) {
      priceDiscontField.innerText = ` ${productDiscontPriceFinal}`;
    }
  };
  const handleClickChangeImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectImage = e.currentTarget.children[0] as HTMLImageElement;
    const tempImgCurUrl = currentImg;
    const tempImgSelUrl = selectImage.src;
    selectImage.setAttribute('src', tempImgCurUrl);
    setCurrentImg(tempImgSelUrl);
  };

  const createImagesContainer = (images: SliderItemDataP[], startIndex: number) => {
    const slicedImages = images?.slice(startIndex);
    return slicedImages?.map((image, index) => (
      <div key={index} className="additional-image-block" onClick={handleClickChangeImage}>
        <img className="additional-img" src={image.url} alt={`product-image-${image.label}`} />
      </div>
    ));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="product-card__container">
      <BreadcrumbsComponent />

      <div className="product-card__block">
        <div className="product-image">
          <div className="product-image-main" onClick={openModal}>
            <img src={`${currentImg}`} alt="product-image" />
          </div>
          <div className="additional-images-container">
            {createImagesContainer(imagesSlider, 1)}
          </div>
        </div>
        <div className="product-parameters">
          <h3>{`${productName}`}</h3>
          <p>{`${productDescription}`}</p>
          <div className="information-about-the-origin-of-the-goods">
            <div className="information information-country">
              <img src={iconLanguage} alt="icon-language" />
              <p>{`Origin: ${productOrigin}`}</p>
            </div>
            <div className="information information-flavor">
              <img src={iconEco} alt="icon-eco" />
              <p>Flavor: {`${productFlavor}`}</p>
            </div>
          </div>
          <p className="price">{`$ ${productPriceFirstLoad}`}</p>
          <p className="price price-discount">{` ${productDiscontPriceFirstLoad}`}</p>
          <div className="product-variants__block">
            <p>Variants</p>
            <div className="variants">
              <div className="variant variant-1 variant-active" onClick={handleClickProdPack}>
                <img src={size50} alt="size-50" />
                <p></p>
              </div>
              <div className="variant variant-2" onClick={handleClickProdPack}>
                <img src={size100} alt="size-100" />
                <p></p>
              </div>
              <div className="variant variant-3" onClick={handleClickProdPack}>
                <img src={size170} alt="size-170" />
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
              <img src={iconKettle} alt="icon-kettle" />
              <p className="list-point__text">
                {' '}
                <b>SERVING SIZE:</b> {`${productServingSize}`}
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src={iconWaterVoc} alt="icon-water-voc" />
              <p className="list-point__text">
                {' '}
                <b>WATER TEMPERATURE:</b> {`${productWaterTemperature}`}
              </p>
            </li>
            <hr className="separator" />
            <li className="list-point">
              <img src={iconAlarm} alt="icon-alarm" />
              <p className="list-point__text">
                {' '}
                <b>STEEPING TIME:</b> {`${productSteepingTime}`}
              </p>
            </li>
          </ul>
        </div>
        <div className="about-tea__container">
          <h3 className="about-tea__title">About this product</h3>
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
        <div className="similar-products__content">{createSimilarProducts(similarProducts)}</div>
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
