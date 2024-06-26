import './heroBlock.scss';
import { Link } from 'react-router-dom';

function HeroBlock() {
  return (
    <>
      <section className="heroSection">
        <div className="heroCont">
          <div className="heroWrap">
            <div className="heroImgDiv">
              <div className="hero_promo first_promo">
                Use promo code <span className="promo_span">HappyStudent</span> for some special set
              </div>
              <div className="hero_promo second_promo">
                Use promo code <span className="promo_span">shopsmart</span> for first order
              </div>
            </div>
            <div className="heroDisc">
              <h1 className="heroDisc_h1">Every day is unique, just like our tea</h1>
              <p className="heroDisc_text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quae dolores
                tenetur doloremque, repudiandae harum magni, praesentium veniam dicta officia
                ariatur sunt iure sequi, molestiae enim blanditiis rerum culpa nam!
              </p>
              <Link className="btn_black heroDisc_link" to="collection">
                browses collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroBlock;
