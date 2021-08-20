import { Col, OverlayTrigger, Image, Popover, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserDropDownProps } from 'Type';
import './index.scss';
import InfoText from '../../Text/index';
import { truncateWalletString } from 'utils';
import ProfileImage from 'components/profile/ProfileImage';

export default function UserDropDown(props: UserDropDownProps) {
  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom-end"
      overlay={
        <Popover id="user-dropdown">
          <h4>{props.userName || truncateWalletString(props.walletAddress)}</h4>
          <InfoText variant="secondary">
            {props.walletAddress ? truncateWalletString(props.walletAddress) : ''}
          </InfoText>
          <Row className="main-row">
            <Col>
              <Row className="balance-row">
                <Col xs="auto">
                  <ProfileImage img={props.userAvatar} />
                </Col>
                <Col>
                  <InfoText variant="primary" size="md">
                    Balance
                  </InfoText>
                  <p>
                    <strong>{props.balance}</strong>
                    <InfoText inline={true}>BNB</InfoText>
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>

          <Link to={`/creatorDetail/${props.walletAddress}`} className="icon-link">
            <Image src="/img/user-icon.svg" />
            MY PROFILE
          </Link>
          <a href="#" className="icon-link">
            <Image src="/img/Icon ionic-md-headset.svg" />
            SUPPORT
          </a>
          {/* <a href="#dc" className="icon-link">
            <Image src="/img/Icon ionic-ios-log-out.svg" />
            DISCONNECT
          </a>
          <a href="#e" className="icon-link earth">
            <Image src="/img/earth.svg" />
            EN
          </a> */}
        </Popover>
      }
      rootClose
    >
      <a className="profile-icon">
        <ProfileImage img={props.userAvatar} />
      </a>
    </OverlayTrigger>
  );
}
