import { Button } from 'components/button/Button';
import InfoText from 'components/Text';
import ProfileImage from 'components/profile/ProfileImage';
import { Card, Col, Image, Row } from 'react-bootstrap';
import './index.scss';
import IconButton from 'components/button/icon';
import { Product } from './Product';
import { NFTObjectData } from 'hooks/useApi';
import { useProfileForWallet } from 'state/hooks';
import { truncateWalletString } from 'utils';
import { useHistory } from 'react-router-dom';
import ProductHistory from '../../../pages/product/detail/history/index';
import { useState } from 'react';

export interface ProductCardPropsType {
  product: NFTObjectData;
  title?: string;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardPropsType) => {
  const [modalShow, setModalShow] = useState(false);
  const { profile } = useProfileForWallet(product.initialCreatorAddress);

  const history = useHistory();

  function goToProductDetails() {
    history.push(`/details/${product.baseID}`);
  }

  function goToCreatorDetails() {
    history.push(`/creatorDetail/${product.initialCreatorAddress}`);
  }

  return (
    <>
      <Card className="creator-card">
        <Card.Header className="click-effect">
          <Card.Img className="card-img-styles" variant="top" src={product.image} onClick={goToProductDetails} />
          <ProfileImage
            img={profile && (profile.userAvatarUrl || '/img/default-profile.png')}
            homeCardStyle
            verified
            rounded
          />
        </Card.Header>
        <Row className="align-items-center my-2 mx-0">
          <Col className="pl-2" md="8" lg="8">
            <InfoText className="m-0" variant="secondary" size="sm">
              Creator
            </InfoText>
            <InfoText className="m-0 text-truncate">
              {profile && (profile.username || truncateWalletString(profile.walletAddress))}
            </InfoText>
          </Col>
          <Col xs="6" lg="8" className="pl-2 pr-0">
            <InfoText className="m-0 text-nowrap text-truncate">{product.name}</InfoText>
          </Col>
          <Col xs="6" lg="8" className="pl-2 pr-0">
            <InfoText className="m-0 d-inline-block mr-2" variant="secondary">
              Price:
            </InfoText>
            <InfoText className="m-0 d-inline-block price-style">{product.price} BNB</InfoText>
          </Col>
        </Row>
        <Row className="align-items-center m-0">
          <Button homeBuyBtn className="btn-curve" variant="primary" label="Buy Now" onClick={goToProductDetails} />
          {/* <Col className="p-0">
            <IconButton label="View History" icon="/img/history.svg" onClick={() => setModalShow(true)} />
          </Col> */}
        </Row>
      </Card>
      {modalShow && <ProductHistory onClose={setModalShow} assetBaseId={product.baseID} />}
    </>
  );
};
export default ProductCard;
