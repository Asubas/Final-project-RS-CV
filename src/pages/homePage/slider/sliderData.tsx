import SliderCard from './sliderCard';
import slide1 from '../../../assets/img/category-1.jpg';
import slide2 from '../../../assets/img/category-2.jpg';
import slide3 from '../../../assets/img/category-3.jpg';
import slide4 from '../../../assets/img/category-4.jpg';
import slide5 from '../../../assets/img/category-5.jpg';
import slide6 from '../../../assets/img/category-6.jpg';
import slide7 from '../../../assets/img/category-7.jpg';
import slide8 from '../../../assets/img/category-8.jpg';
import './slider.scss';

export interface SliderItemData {
  id: number;
  imgUrl: string;
  text: string;
}

const data: SliderItemData[] = [
  {
    id: 1,
    imgUrl: slide1,
    text: 'black tea',
  },
  {
    id: 2,
    imgUrl: slide2,
    text: 'green tea',
  },
  {
    id: 3,
    imgUrl: slide3,
    text: 'white tea',
  },
  {
    id: 4,
    imgUrl: slide4,
    text: 'matcha',
  },
  {
    id: 5,
    imgUrl: slide5,
    text: 'herbal tea',
  },
  {
    id: 6,
    imgUrl: slide6,
    text: 'chai',
  },
  {
    id: 7,
    imgUrl: slide7,
    text: 'oolong',
  },
  {
    id: 8,
    imgUrl: slide8,
    text: 'rooibos',
  },
];

export const category = data.map((item) => (
  <SliderCard key={item.id} img={item.imgUrl} text={item.text} />
));
