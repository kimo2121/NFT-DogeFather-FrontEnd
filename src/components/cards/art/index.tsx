import InfoText from 'components/Text';
import { string } from 'prop-types';
import './index.scss';
export default function ArtCard({ title, image }) {
  return (
    <div className="art-card rounded-1 card p-0 shadow">
      <img src={image} />
      <div className="art-card__title">
        <InfoText className="m-0">{title}</InfoText>
      </div>
    </div>
  );
}

ArtCard.propTypes = {
  title: string.isRequired,
  image: string.isRequired,
};
