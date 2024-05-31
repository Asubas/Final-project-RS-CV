import '../homePage/slider/slider.scss';
import SliderCardProduct from './sliderCardProduct';

export interface SliderItemDataP {
  url: string;
  label: string;
}

function categoryP(imagesSlider: SliderItemDataP[]) {
  console.log(imagesSlider);
  if (!imagesSlider || imagesSlider.length === 0) {
    return null;
  }
  return imagesSlider.map((item) => <SliderCardProduct key={item['label']} img={item['url']} />);
}

export default categoryP;
