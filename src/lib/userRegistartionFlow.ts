import registerUser from './registerUser';

export default async function registerCustomer() {
  const promises = [];
  try {
    promises.push(registerUser());
    return await Promise.race(promises);
  } catch {
    return null;
  }
}
