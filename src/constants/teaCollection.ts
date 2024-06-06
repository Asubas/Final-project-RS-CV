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
  'Black tea',
  'Green tea',
  'White tea',
  'Matcha',
  'Herbal tea',
  'Chai',
  'Oolong',
  'ROOIBOS',
  'All',
];

const backgroundImagesTea = [
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
  category7,
  category8,
  category9,
];

const teaUrl = {
  'e95627db-9d4a-46b3-bc71-99f4263a8520': 'blackTea',
  '0b997259-d0e4-4b44-97f1-0379fab106d2': 'greenTea',
  'c63e9ac5-f61b-4414-94a4-71aae71655ed': 'whiteTea',
  'b85137c0-3d6b-4401-a9d6-3b3c5458fd50': 'matcha',
  'ff7356e4-bf71-42af-9c5e-1c3993cf63a3': 'herbalTea',
  '814d9351-c793-4ab3-8df6-136b6e590dcf': 'chaiTea',
  '483c6c62-1927-4cea-8069-777b5475ea09': 'ooloong',
  'd7ea34fe-98c1-4fc9-8483-45e4928fcb0b': 'rooibos',
  'caf2b3c5-799e-4d6e-860c-363bf2d6542b': 'All',
};

export interface TeaUrlType {
  [key: string]: string;
}

export { subcategoriesTea, backgroundImagesTea, teaUrl };
