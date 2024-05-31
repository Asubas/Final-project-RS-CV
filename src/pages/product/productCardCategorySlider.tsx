// import SliderCard from './sliderCard';
// import slide1 from '../../../assets/img/category-1.jpg';
// import slide2 from '../../../assets/img/category-2.jpg';
// import slide3 from '../../../assets/img/category-3.jpg';
// import slide4 from '../../../assets/img/category-4.jpg';
// import slide5 from '../../../assets/img/category-5.jpg';
// import slide6 from '../../../assets/img/category-6.jpg';
// import slide7 from '../../../assets/img/category-7.jpg';
// import slide8 from '../../../assets/img/category-8.jpg';
// import slide9 from '../../../assets/img/category-9.jpg';
import '../homePage/slider/slider.scss';
import SliderCard from '../homePage/slider/sliderCard';
import SliderCardProduct from './sliderCardProduct';

export interface SliderItemDataP {
  //   id: number;
  url: string;
  label: string;
}

// const data: SliderItemData[] = [
//   {
//     id: 1,
//     imgUrl: slide1,
//     text: 'black tea',
//   },
//   {
//     id: 2,
//     imgUrl: slide2,
//     text: 'green tea',
//   },
//   {
//     id: 3,
//     imgUrl: slide3,
//     text: 'white tea',
//   },
//   {
//     id: 4,
//     imgUrl: slide4,
//     text: 'matcha',
//   },
//   {
//     id: 5,
//     imgUrl: slide5,
//     text: 'herbal tea',
//   },
//   {
//     id: 6,
//     imgUrl: slide6,
//     text: 'chai',
//   },
//   {
//     id: 7,
//     imgUrl: slide7,
//     text: 'oolong',
//   },
//   {
//     id: 8,
//     imgUrl: slide8,
//     text: 'rooibos',
//   },
//   {
//     id: 9,
//     imgUrl: slide9,
//     text: 'teaware',
//   },
// ];

function categoryP(imagesSlider: SliderItemDataP[]) {
  console.log(imagesSlider);
  if (!imagesSlider || imagesSlider.length === 0) {
    return null; // или возвращаем другой компонент-заглушку
  }
  return imagesSlider.map((item) => <SliderCardProduct key={item['label']} img={item['url']} />);
}

export default categoryP;
