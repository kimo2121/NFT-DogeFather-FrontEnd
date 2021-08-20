import InfoText from 'components/Text';
import { Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './index.scss';

import { Artist } from './Artist';
import ProfileImage from 'components/profile/ProfileImage';
import { useEffect, useState } from 'react';
import { NFTTopArtist } from 'hooks/useApi';
import { useHistory } from 'react-router-dom';
import { truncateWalletString } from 'utils';

interface ArtistProfileCardPropsType {
  artist: NFTTopArtist;
  rank: number;
  onSelect?: (artist: NFTTopArtist) => void;
}
const ArtistProfileCard = ({ artist, rank, onSelect }: ArtistProfileCardPropsType) => {
  const history = useHistory();

  return (
    <div className="artist-profile-card">
      <Row
        className="card-row py-2 rounded-1"
        onClick={() => history.push(`/creatorDetail/${artist.user.walletAddress}`)}
      >
        <InfoText className="mb-0 top-artist-rank">{rank}</InfoText>
        <Col xs="auto" className="p-0">
          <ProfileImage img={artist.user.userAvatarUrl || '/img/default-profile.png'} />
        </Col>
        <Col className="artist-name-price">
          <InfoText className="mb-1 text-ellipsis">
            {artist.user.username || truncateWalletString(artist.user.walletAddress)}
          </InfoText>
          <InfoText size="sm" variant="secondary" className="mb-0 text-ellipsis">
            {artist.soldAmount.toFixed(4)} BNB
          </InfoText>
        </Col>
      </Row>
    </div>
  );
};

interface ArtistCardPropsType {
  className?: string;
  artistList: Array<NFTTopArtist>;
  onSelect?: (artist: NFTTopArtist) => void;
}
const ArtistCard = ({ className, artistList, onSelect }: ArtistCardPropsType) => {
  return (
    <Container className={`artist-card position-relative ${className}`}>
      {/* <Image className="triangle-top-left" src="/img/triangle-3D.svg" /> */}
      <Card className="shadow-none">
        <InfoText size="lg">
          Top Artists <Image src="/img/rainbow.png" />
        </InfoText>
        <Card.Body className="atrist-sub-card-scroll py-1 px-3 cstm-scroll">
          {artistList && artistList.map((artist, i) => <ArtistProfileCard key={i} artist={artist} rank={i + 1} />)}
        </Card.Body>
      </Card>
    </Container>
  );
};
export default ArtistCard;
