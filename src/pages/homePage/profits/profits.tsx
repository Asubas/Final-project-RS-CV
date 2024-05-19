import './profits.scss';

function Profits() {
  return (
    <section className="profits">
      <div className="profitsWrap">
        <div className="benefits">
          <div className="benefits_benefit">
            <div className="benefits_benefit__icon benCup"></div>
            <p className="benefits_benefit__text">450+ KIND OF LOOSEF TEA</p>
          </div>
          <div className="benefits_benefit">
            <div className="benefits_benefit__icon benRedeem"></div>
            <p className="benefits_benefit__text">CERTIFICATED ORGANIC TEAS</p>
          </div>
          <div className="benefits_benefit">
            <div className="benefits_benefit__icon benShipping"></div>
            <p className="benefits_benefit__text">FREE DELIVERY</p>
          </div>
          <div className="benefits_benefit">
            <div className="benefits_benefit__icon benSell"></div>
            <p className="benefits_benefit__text">SAMPLE FOR ALL TEAS</p>
          </div>
        </div>
        <button className="btn_white learnMore">learn more</button>
      </div>
    </section>
  );
}

export default Profits;
