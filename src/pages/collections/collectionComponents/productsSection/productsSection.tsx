import './productsSection.scss';
import ProductCard from './productCard/productCard';
const Products = () => {
  return (
    <section className="collection-page_content-products products">
      {/* {(() => {
        const elements = [];
        for (let i = 0; i < 9; i++) {
          elements.push(<ProductCard key={i} />);
        }
        return elements;
      })()} */}
      <ProductCard />
    </section>
  );
};

export default Products;
