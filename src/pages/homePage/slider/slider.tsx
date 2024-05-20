import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { category } from './sliderData';
import './slider.scss';

function Slider() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1280 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1280, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1100, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="sliderSection">
      <div className="sliderCont">
        <h2 className="collectionSection">Our Collection</h2>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {category}
        </Carousel>
      </div>
    </section>
  );
}

export default Slider;
