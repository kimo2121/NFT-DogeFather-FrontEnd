import { Button } from 'components/button/Button';
import CheckButton from 'components/button/check';
import InfoText from 'components/Text';
import { Card, Col, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import './index.scss';

export const Card1 = () => {
  return (
    <Row className="aboutus-card1 my-5 align-items-center">
      <Col xs="12" sm="7">
        <Card className="p-1">
          <Card.Body>
            <Card.Img src="/img/c-bg-1.png" className="shadow" />
          </Card.Body>
          <Card.Footer className="border-0 py-4">
            <Row>
              <Col>
                <InfoText className="m-0">TESLA GIVEAWAY!!! Part 1 of 2</InfoText>
              </Col>
              <Col className="text-right">
                <InfoText size="md" variant="secondary" className="m-0">
                  899 subscribers
                </InfoText>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Col>
      <Col xs="12" sm="5">
        <InfoText size="lg" className="mb-4 text-warning text-center text-sm-left mt-5 mt-sm-0">
          DogefatherBSC Family!
        </InfoText>
        <InfoText className="mb-4 text-center text-sm-left" variant="secondary">
          DogeFather is one of of the Fastest growing crypto <br />
          coins and communities of all time! Join our <br />
          community in our lively{' '}
          <a href="#" className="text-warning">
            Telegram
          </a>{' '}
          chats and voice <br />
          calls, as well as our{' '}
          <a href="#" className="text-warning">
            Discord
          </a>{' '}
          server!
        </InfoText>
      </Col>
    </Row>
  );
};

interface card2Props {
  title: string;
  text: string;
  className?: string;
}
export const Card2 = ({ title, text, className }: card2Props) => {
  return (
    <Card className={`aboutus-card2 ${className}`}>
      <InfoText size="lg" className="home-header-text mb-2">
        {title}
      </InfoText>
      <Card.Body className="card bg-primary border shadow rounded p-4">
        <InfoText className="mb-4" variant="secondary">
          {text}
        </InfoText>
      </Card.Body>
    </Card>
  );
};
