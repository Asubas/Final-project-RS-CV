import './productCardInformation.scss';
import MyButton from '../../components/button/button';

function DisplayProductInformation() {
  return (
    <div className="product-card__container">
      <h4>PATH</h4>
      <div className="product-card__block">
        <div className="product-image">
          <img src="#" alt="product-image" />
        </div>
        <div className="product-parameters">
          <h3>Ceylon Ginger Cinnamon chai tea</h3>
          <p>A lovely warming Chai tea with ginger cinnamon flavours.</p>
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
          <p className="price">€3.90</p>
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
              <MyButton className="btn_transparent " type="button">
                {' '}
                -
              </MyButton>
              <p>0</p>
              <MyButton className="btn_transparent " type="button">
                {' '}
                +
              </MyButton>
            </div>
            <MyButton className="btn_black " type="button">
              {' '}
              ADD TO BAG
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayProductInformation;
