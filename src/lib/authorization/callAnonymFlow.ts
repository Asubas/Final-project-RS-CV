import { createAnonymUser } from './createAnonumUser';

if (!localStorage.getItem('userId')) {
  createAnonymUser();
}
