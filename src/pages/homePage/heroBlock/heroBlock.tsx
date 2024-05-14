import './heroBlock.scss';
import heroImg from '../../../assets/img/hero.jpg';

function HeroBlock() {
  return (
    <>
      <section className="heroWrap">
        <img src={heroImg} alt="Different teas" className="heroImg" />
        <div className="heroDisc">
          <h1 className="heroDisc_h1">Every day is unique, just like our tea</h1>
          <p className="heroDisc_text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quae dolores tenetur
            doloremque, repudiandae harum magni, praesentium veniam dicta officia pariatur sunt iure
            sequi, molestiae enim blanditiis rerum culpa nam!
          </p>
          <button className="btn_black">browes teas</button>
        </div>
      </section>
    </>
  );
}

export default HeroBlock;
