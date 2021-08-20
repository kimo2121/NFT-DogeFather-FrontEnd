import { Col, Container, Image, Row } from 'react-bootstrap';
import SocialButtons from '../socialButtons';
import './Footer.scss';

export const Footer = () => {
  return (
    <div className="main-footer text-center">
      <Image className="logo mb-3" src="/img/logo.svg" fluid />
      {/* <Row className="inner-row m-0">
        <Col>
          <a href="#" className="nav-link">
            Terms Of Service
          </a>
        </Col>
        <Col className="">
          <a href="#" className="nav-link">
            Privacy Policy
          </a>
        </Col>
      </Row> */}
      <div className="social-container">
        <SocialButtons
          twitter="https://twitter.com/Dogefatherbsc_"
          telegram="http://t.me/dogefatherBSC"
          discord="http://discord.gg/KE7dgwj6XG"
        />
      </div>
      <p>Copyright &copy; 2021 DogefatherBSC</p>
    </div>
  );
};
