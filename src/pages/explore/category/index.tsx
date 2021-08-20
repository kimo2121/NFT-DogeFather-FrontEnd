import ProductCard from 'components/cards/product';
import InfoText from 'components/Text';
import { Card, CardDeck, Col, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import './index.scss';

const ExploreCategory = ({ onClick, products, title }) => {
  return (
    <div className="category">
      <InfoText variant="secondary" size="lg">
        {title}
      </InfoText>
      <Row>
        {products.map(product => (
          <Col xl="4" md="4">
            <ProductCard product={product} onClick={onClick} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ExploreCategory;
