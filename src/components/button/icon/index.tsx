import InfoText from 'components/Text';
import { Image } from 'react-bootstrap';
import './index.scss';

interface propsType {
  label?: string;
  icon: string;
  rounded?: boolean;
  className?: string;
  onClick?: Function;
}
const IconButton = ({ label, icon, rounded, className, onClick }: propsType) => {
  return (
    <button
      type="button"
      className={`btn click-effect icon-button ${className} ${rounded && 'icon-button-round'}`}
      onClick={() => onClick && onClick()}
    >
      <Image src={icon} /> {label && <InfoText className="d-inline-block m-0">{label}</InfoText>}
    </button>
  );
};
export default IconButton;
