import { ProductProjection } from '@commercetools/platform-sdk';

const createSimilarProducts = (similarProducts: ProductProjection[]) => {
    return similarProducts.map((el, index) => {
        const imageUrl = el.masterVariant.images?.[0]?.url;
        const imageLabel = el.masterVariant.images?.[0]?.label;
        const similarProductPrice = el.masterVariant.prices?.[0]?.value?.centAmount;
        console.log(similarProducts)
        const productName = el.name['en-GB'];
        const similarProductPriceFinal =
        Number(similarProductPrice) / 100 === Math.trunc(Number(similarProductPrice) / 100)
          ? `${Number(similarProductPrice) / 100}.00`
          : `${(Number(similarProductPrice) / 100).toFixed(1)}0`;
    
        return (
          <div key={index} className="productsCard">
            <div className="similar-product-image">
              {imageUrl ? (
                <img src={imageUrl} alt={imageLabel || 'Product image'} />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <p>{productName}</p>
            <p>{`$ ${similarProductPriceFinal}`}</p>
            {/* Добавьте другие элементы отображения продукта, например цену */}
          </div>
        );
});
}
export default createSimilarProducts;