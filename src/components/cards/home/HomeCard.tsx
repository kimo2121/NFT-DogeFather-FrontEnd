import { Card, Col, Row } from 'react-bootstrap';
import { ToggleButton } from '../../button/toggle/ToggleButton';
import ProfileImage from '../../profile/ProfileImage';
import './HomeCard.css';

const HomeCard = () => {
  return (
    <Card className="home-card">
      <Card.Header>
        <Card.Img variant="top" src="/img/home-card.png" />
      </Card.Header>
      <Card.Footer>
        <Row className="row1">
          <Col className="col1">
            <Row className="row11">
              <Col className="col11" lg="auto" sm="auto">
                <ProfileImage />
              </Col>
              <Col className="col12">
                <Card.Subtitle className="user-designation">Created & owned by</Card.Subtitle>
                <Card.Title className="user-name">User's Name</Card.Title>
              </Col>
            </Row>
          </Col>
          <Col className="col2" lg="auto" sm="auto">
            <div className="round-circle">
              <ToggleButton active={false} activeImg="/img/heart-filled.svg" defaultImg="/img/heart.svg" />
              <Card.Text className="n-o-likes">3</Card.Text>
            </div>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
export default HomeCard;
