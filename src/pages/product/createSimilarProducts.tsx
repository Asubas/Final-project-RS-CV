import { ProductProjection } from '@commercetools/platform-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductById } from '../../lib/getProductInfo';

const createSimilarProducts = (similarProducts: ProductProjection[]) => {
  if(document.querySelector('.variant-active')){
    const activeProdPack = document.querySelector('.variant-active');
    activeProdPack?.classList.remove('variant-active');
    const firstProdPack = document.querySelector('.variant-1');
   
    firstProdPack?.classList.add('variant-active');
  }
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    getProductById(id).then((res) => {
      if (res.statusCode === 200) {
        const currentUrl = location.pathname;
        const indexSymbUrl = currentUrl.lastIndexOf('/');
        const FinalUrl = currentUrl.substring(0, indexSymbUrl);
        const path = res.body.masterData.current.slug['en-GB'];
        navigate(`${FinalUrl}/${path}`, { state: res.body });
      }
    });
  };
  return similarProducts.map((el, index) => {
    const imageUrl = el.masterVariant.images?.[0]?.url;
    const imageLabel = el.masterVariant.images?.[0]?.label;
    const similarProductID = el.id || '';
    const similarProductPrice = el.masterVariant.prices?.[0]?.value?.centAmount;
    const productName = el.name['en-GB'];
    const similarProductPriceFinal =
      Number(similarProductPrice) / 100 === Math.trunc(Number(similarProductPrice) / 100)
        ? `${Number(similarProductPrice) / 100}.00`
        : `${(Number(similarProductPrice) / 100).toFixed(1)}0`;

    return (
      <div key={index} className="productsCard" onClick={() => handleClick(similarProductID)}>
        <div className="similar-product-image">
          {imageUrl ? (
            <img src={imageUrl} alt={imageLabel || 'Product image'} />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <p>{productName}</p>
        <p>{`$ ${similarProductPriceFinal}`}</p>
      </div>
    );
  });
};
export default createSimilarProducts;
