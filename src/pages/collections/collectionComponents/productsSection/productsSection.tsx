import './productsSection.scss';
import ProductCard from './productCard/productCard';
import MyButton from '../../../../components/button/button';
const Products = () => {
  return (
    <section className="collection-page_content-products products">
      <div className="products_sort-container">
        <MyButton type="button">SORT BY </MyButton>
      </div>
      <ProductCard />
    </section>
  );
};

export default Products;
