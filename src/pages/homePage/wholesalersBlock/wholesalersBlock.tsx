import './wholesalers.scss';

function Wholesalers() {
  return (
    <>
      <section className="wholesalersSection">
        <div className="wholesalersCont">
          <div className="wsWrap">
            <div className="wsWrap_disc">
              <h2 className="wsWrap_disc__head">for wholesalers</h2>
              <p className="wsWrap_disc__text">
                We offer loose tea leaves of the best quality for your business. With a choice of
                more than 450 different kinds of loose tea, we can make a sophisticated selection
                that fits exactly in your kind of establishment.
              </p>
              <a className="btn_white wsWrap_disc__link" href="mailto:monkeys.together@power.com">
                get a free consultation
              </a>
            </div>
            <div className="wsWrap_img"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Wholesalers;
