import MainContent from './collectionComponents/collectionMainContent';

function Collection() {
  return (
    <>
      <div className="collection-page collection-page_top-img">
        <img
          src="src/assets/img/topImgCatalog.jpg"
          width="100%"
          height="308px"
          alt="beautiful tea cup"
        ></img>
      </div>
      <MainContent />
    </>
  );
}

export default Collection;
