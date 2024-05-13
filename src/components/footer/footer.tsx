import { Link } from 'react-router-dom';
import './footer.scss';
import rsLogo from '../../assets/svg/rs_school_js.svg';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer_block">
          <Link className="footer_block__head btn_blank" to="collection">
            collection
          </Link>
          <ul className="footer_block__tab">
            <li className="footer_block__item">
              <Link className="footer_block__link btn_blank" to="">
                Black Tea
              </Link>
            </li>
            <li className="footer_block__item">
              <Link className="footer_block__link btn_blank" to="">
                Green Tea
              </Link>
            </li>
            <li className="footer_block__item">
              <Link className="footer_block__link btn_blank" to="">
                Coffee
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer_block">
          <p className="footer_block__head btn_blank only-head">Created thanks to</p>
          <ul className="footer_block__tab">
            <li className="footer_block__item">
              <a className="rs-link" href="https://rs.school/" target="_blank" rel="noreferrer">
                <img src={rsLogo} alt="RS Logo" />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_block">
          <p className="footer_block__head btn_blank only-head">our team</p>
          <ul className="footer_block__tab">
            <li className="footer_block__item member-list">
              <a
                className="footer_block__link btn_blank git-link"
                href="https://github.com/Asubas"
                target="_blank"
                rel="noreferrer"
              >
                Asubas
              </a>
            </li>
            <li className="footer_block__item member-list">
              <a
                className="footer_block__link btn_blank git-link"
                href="https://github.com/lipan4836"
                target="_blank"
                rel="noreferrer"
              >
                lipan48
              </a>
            </li>
            <li className="footer_block__item member-list">
              <a
                className="footer_block__link btn_blank git-link"
                href="https://github.com/DzmitryAlekseev"
                target="_blank"
                rel="noreferrer"
              >
                DzmitryAlekseev
              </a>
            </li>
          </ul>
        </div>
        <div className="footer_block">
          <Link className="footer_block__head btn_blank" to="about">
            contact us
          </Link>
          <ul className="footer_block__tab">
            <li className="footer_block__item member-list location">
              <a
                className="footer_block__link btn_blank git-link"
                href="https://maps.app.goo.gl/84e34pzSAWTHKvff6"
                target="_blank"
                rel="noreferrer"
              >
                Wagonowa 1, 53-609 Wrocław, Poland
              </a>
            </li>
            <li className="footer_block__item member-list mail-to">
              <a
                className="footer_block__link btn_blank git-link"
                href="mailto:monkeys.together@power.com"
                target="_blank"
                rel="noreferrer"
              >
                Email: monkeys.together@power.com
              </a>
            </li>
            <li className="footer_block__item member-list call-to">
              <a
                className="footer_block__link btn_blank git-link"
                href="tel:+48717215958"
                target="_blank"
                rel="noreferrer"
              >
                Tel: +48 71 721 59 58
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
