import InfoText from 'components/Text';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Button } from '../../../components/button/Button';
import { Explore } from './Explore';
import './index.scss';

interface ExploreCardPropsType {
  className?: string;
  exploreList: Array<Explore>;
  onClick?: (explore: Explore) => void;
  onFilterClick?: () => void;
}
const ExploreCard = ({ className, exploreList, onClick, onFilterClick }: ExploreCardPropsType) => {
  return (
    <Card className={`explore-card p-0 ${className}`}>
      <Card.Body className="px-0">
        <InfoText size="lg" className="px-3">
          Explore <Image src="/img/rainbow.png" />
        </InfoText>

        <div className="explore-card-scroll pt-3 px-3 pb-1 cstm-scroll">
          <Button
            variant="primary"
            img="/img/filter.svg"
            className="filter-icon"
            onClick={onFilterClick && onFilterClick}
          />

          {exploreList.map((explore, i) => (
            <Button
              key={i}
              variant="primary"
              img={explore.icon}
              label={explore.title}
              className="explore-btn ml-3"
              onClick={() => onClick && onClick(explore)}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
export default ExploreCard;
