import { NavigateBack, NavigateForward } from '../../components/navigateBtn/navigateBtn';

function Collection() {
  console.log('collection page');

  return (
    <>
      <h1>Collection</h1>
      <NavigateBack />
      <NavigateForward />
    </>
  );
}

export default Collection;
