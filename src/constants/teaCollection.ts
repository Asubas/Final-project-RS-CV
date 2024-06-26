import category1 from '../assets/img/category-1.jpg';
import category2 from '../assets/img/category-2.jpg';
import category3 from '../assets/img/category-3.jpg';
import category4 from '../assets/img/category-4.jpg';
import category5 from '../assets/img/category-5.jpg';
import category6 from '../assets/img/category-6.jpg';
import category7 from '../assets/img/category-7.jpg';
import category8 from '../assets/img/category-8.jpg';
import category9 from '../assets/img/category-9.jpg';

const subcategoriesTea = [
  'all',
  'Black tea',
  'Green tea',
  'White tea',
  'Matcha',
  'Herbal tea',
  'Chai',
  'Oolong',
  'ROOIBOS',
];

const backgroundImagesTea = [
  category9,
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
];

const teaUrl = {
  '31b6149e-63ed-4c97-b77e-320f62294fb1': 'all',
  '212212fe-028d-4e7c-b029-598e3bda4d38': 'blackTea',
  '0e519fef-86b5-40f9-a429-d62ae81960a3': 'greenTea',
  '3017e64e-09b1-4c2e-8cd3-e17f94ceb02a': 'whiteTea',
  '03a7e1ef-97f2-460b-874a-c2ae744b84b2': 'matcha',
  '17fe5564-39dc-4080-9ff5-f0a8e8df6535': 'herbalTea',
  '2492c797-d217-4084-ad8a-6cc0c497b130': 'chaiTea',
  'ad28a6ec-9e1e-40e5-aebb-9ceb7ca8875d': 'ooloong',
  '298325f8-9dae-4541-9918-76273e017c75': 'rooibos',
};

export interface TeaUrlType {
  [key: string]: string;
}

export { subcategoriesTea, backgroundImagesTea, teaUrl };
