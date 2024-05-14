import './heroBlock.scss';
import heroImg from '../../../assets/img/hero.jpg';
import { Link } from 'react-router-dom';

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
          <Link className="btn_black heroDisc_link" to="collection">
            browes teas
          </Link>
        </div>
      </section>
    </>
  );
}

export default HeroBlock;
