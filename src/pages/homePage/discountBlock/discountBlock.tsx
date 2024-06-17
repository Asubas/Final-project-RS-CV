import './discountBlock.scss';

function DiscountBlock() {
  return (
    <section className="discountSect">
      <div className="discountWrap">
        <h2 className="discountH2">Discount</h2>
        <p className="discount_promo">
          If you are an RS School student, then use the{' '}
          <span className="discount_promo_code">HappyStudent</span> promo code and get a special set
          that will help you in the race before the deadline.
        </p>
        <p className="discount_promo">
          If this is your first time in our store, then we have prepared a promo code for you that
          will make your first purchase 20% more profitable! Don&lsquo;t miss your chance and enter
          the
          <span className="discount_promo_code">shopsmart</span> promo code.
        </p>
      </div>
    </section>
  );
}

export default DiscountBlock;
