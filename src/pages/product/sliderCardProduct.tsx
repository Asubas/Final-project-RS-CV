function SliderCardProduct(props: { img: string }) {
    return (
      <div className="slideWrapProduct">
        <img src={props.img} alt="Image product" className="slideImgProduct" />
      </div>
    );
  }
  
  export default SliderCardProduct;
  