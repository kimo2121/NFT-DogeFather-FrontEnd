import IconButton from 'components/button/icon';
import { Col, Container, Image, Row } from 'react-bootstrap';
import './index.css';

const SocialButtons = ({ twitter = '', telegram = '', discord = '', youtube = '' }) => {
  return (
    <Row className="social-buttons">
      {twitter && (
        <Col className="p-0">
          <a href={twitter} target="blank">
            <IconButton icon="/img/social/twitter.svg" rounded />
          </a>
        </Col>
      )}
      {telegram && (
        <Col className="p-0">
          <a href={telegram} target="blank">
            <IconButton icon="/img/social/telegram.svg" rounded />
          </a>
        </Col>
      )}
      {discord && (
        <Col className="p-0">
          <a href={discord} target="blank">
            <IconButton icon="/img/social/discord.svg" rounded />
          </a>
        </Col>
      )}
      {youtube && (
        <Col className="p-0">
          <IconButton icon="/img/social/youtube.svg" rounded />
        </Col>
      )}
    </Row>
  );
};
export default SocialButtons;
