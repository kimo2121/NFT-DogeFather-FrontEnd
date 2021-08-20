import { CardDeck, Col, Container, Row } from 'react-bootstrap';
import './index.scss';
import ProductDetailHeader from './header/index';
import ArtCard from 'components/cards/art';
import { Button } from 'components/button/Button';
import ProfileImage from 'components/profile/ProfileImage';
import InfoText from 'components/Text';
import IconButton from 'components/button/icon';
import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { NFTDetail, useGetNFTDetail } from 'hooks/useApi';
import ProductCard from 'components/cards/product';

export const ProductDetails = ({
  match: {
    params: { baseId },
  },
}: RouteComponentProps<{ baseId: string }>) => {
  const history = useHistory();
  const nftDetail: NFTDetail = useGetNFTDetail(baseId);

  if (!nftDetail) {
    return <></>;
  }

  return (
    <div className="product-detail">
      <Container>
        <ProductDetailHeader
          name={nftDetail?.nft.name}
          description={nftDetail?.nft.description}
          image={nftDetail?.nft.image}
          price={nftDetail?.nft.price}
          ownerAddress={nftDetail?.nft.ownerAddress}
          tokenID={nftDetail?.nft.tokenID}
          listed={nftDetail?.nft.listed}
          nftDetail={nftDetail}
        />
      </Container>
      <div className="border bg-onPrimary mt-5 shadow">
        <Container>
          <div className="card navigation-card bg-primary border">
            <InfoText className="d-inline-block mb-0">More Art From The Owner</InfoText>
            <IconButton className="" icon="/img/arrowleft.svg" rounded />
            <IconButton icon="/img/arrowright.svg" rounded onClick={() => {}} />
          </div>
          <Row className="my-4">
            {nftDetail.relatedNFTs?.map((item, index) => (
              <Col xs="12" sm="4" className="mb-3">
                <ProductCard key={index} product={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default ProductDetails;
