import { Link } from 'react-router-dom';
import './footer.scss';
import rsLogo from '../../assets/svg/rs_school_js.svg';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footerWrap">
          <div className="footer_block">
            <Link className="footer_block__head btn_blank" to="collection">
              collection
            </Link>
            <div className="footer_block__tab">
              <div className="footer_block__item">
                <Link className="footer_block__link btn_blank" to="collection/tea">
                  Tea
                </Link>
              </div>
              <div className="footer_block__item">
                <Link className="footer_block__link btn_blank" to="collection/coffee">
                  Coffee
                </Link>
              </div>
              <div className="footer_block__item">
                <Link className="footer_block__link btn_blank" to="collection/cocoa">
                  Cocoa
                </Link>
              </div>
            </div>
          </div>
          <div className="footer_block">
            <p className="footer_block__head btn_blank only-head">Created thanks to</p>
            <div className="footer_block__tab">
              <div className="footer_block__item">
                <a className="rs-link" href="https://rs.school/" target="_blank" rel="noreferrer">
                  <img src={rsLogo} alt="RS Logo" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer_block">
            <p className="footer_block__head btn_blank only-head">our team</p>
            <div className="footer_block__tab">
              <div className="footer_block__item member-list">
                <div className="git-logo"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="https://github.com/Asubas"
                  target="_blank"
                  rel="noreferrer"
                >
                  Asubas
                </a>
              </div>
              <div className="footer_block__item member-list">
                <div className="git-logo"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="https://github.com/lipan4836"
                  target="_blank"
                  rel="noreferrer"
                >
                  lipan48
                </a>
              </div>
              <div className="footer_block__item member-list">
                <div className="git-logo"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="https://github.com/DzmitryAlekseev"
                  target="_blank"
                  rel="noreferrer"
                >
                  DzmitryAlekseev
                </a>
              </div>
            </div>
          </div>
          <div className="footer_block contact">
            <Link className="footer_block__head btn_blank" to="about">
              contact us
            </Link>
            <div className="footer_block__tab">
              <div className="footer_block__item member-list">
                <div className="location"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="https://maps.app.goo.gl/84e34pzSAWTHKvff6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Wagonowa 1,
                  <br /> 53-609 Wrocław, Poland
                </a>
              </div>
              <div className="footer_block__item member-list">
                <div className="mail-to"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="mailto:monkeys.together@power.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email: monkeys@team.com
                </a>
              </div>
              <div className="footer_block__item member-list">
                <div className="call-to"></div>
                <a
                  className="footer_block__link btn_blank git-link"
                  href="tel:+48717215958"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tel: +48 71 721 59 58
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
