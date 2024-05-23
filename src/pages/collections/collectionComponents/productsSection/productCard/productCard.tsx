import productList from '../../../requestsToProducts/productList';

const ProductCard = () => {
  const productProperty = productList().then((r) => r.results);
  return (
    <div className="productsCard">
      <ul className="productsCard-list">
        <li className="productsCard-item productsCard-item_img">
          <img src="#" width="264px" alt="some"></img>
        </li>
        <li className="productsCard-item productsCard-item_description">
          <p>Описание товара</p>
        </li>
        <li className="productsCard-item productsCard-item_price">
          <span>Цена товара</span>
        </li>
      </ul>
    </div>
  );
};

export default ProductCard;
