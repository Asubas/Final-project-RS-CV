import HeroBlock from './heroBlock/heroBlock';
import Profits from './profits/profits';
import Slider from './slider/slider';
import Wholesalers from './wholesalersBlock/wholesalersBlock';

export default function MainPage() {
  return (
    <>
      <HeroBlock />
      <Profits />
      <Slider />
      <Wholesalers />
    </>
  );
}
