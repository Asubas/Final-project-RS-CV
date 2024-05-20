function SliderCard(props: { img: string; text: string }) {
  return (
    <div className="slideWrap">
      <img src={props.img} alt="Image category" className="slideImg" />
      <p className="slideText">{props.text}</p>
    </div>
  );
}

export default SliderCard;
