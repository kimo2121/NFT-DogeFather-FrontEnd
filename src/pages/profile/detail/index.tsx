import { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import HomeCard from '../../../components/cards/home/HomeCard';
import InfoText from '../../../components/Text';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import './index.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import ProductCard from 'components/cards/product';
import IconButton from 'components/button/icon';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from 'state/hooks';
import { useGetNFTUserFullDetail } from 'hooks/useApi';
import { truncateWalletString } from 'utils';

const ProfileDetail = ({
  match: {
    params: { walletAddress },
  },
}: RouteComponentProps<{ walletAddress: string }>) => {
  const history = useHistory();
  let data = useLocation().state;

  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const nftUserFullDetail = useGetNFTUserFullDetail(walletAddress);

  if (!nftUserFullDetail || !nftUserFullDetail.user_profile) {
    return <></>;
  }

  return (
    <div className="profile-detail">
      <Row className="banner justify-content-center">
        <Image src={nftUserFullDetail.user_profile.userBackgroupUrl || '/img/c-bg-1.png'} fluid />
      </Row>
      <Container>
        <div className="user-block">
          <ProfileImage
            img={nftUserFullDetail.user_profile.userAvatarUrl}
            blurBG
            verified={nftUserFullDetail.user_profile.verified}
          />

          <Row className="mt-3">
            <Col>
              <Row className="align-items-center">
                <Col className="pr-0">
                  <InfoText size="lg" className="m-0 username">
                    {nftUserFullDetail.user_profile.username || truncateWalletString(walletAddress)}
                  </InfoText>
                </Col>
                {profile?.walletAddress.toLowerCase() === walletAddress.toLowerCase() && (
                  <Col xs="auto" className="text-right">
                    <Link to="/profile/edit" className="link-btn">
                      <InfoText size="sm" variant="secondary" className="d-inline-block m-0">
                        <Image className="lang" src="/img/edit.svg" /> Edit profile
                      </InfoText>
                    </Link>
                  </Col>
                )}
              </Row>

              <Row className="align-items-center">
                <Col xs="auto" className="pr-0">
                  <InfoText variant="secondary" size="md" className="m-0 sub-title-text">
                    {nftUserFullDetail.user_profile.userBio}
                  </InfoText>
                </Col>
                <Col xs="auto">
                  <IconButton
                    className="share-btn"
                    icon="/img/copy.svg"
                    rounded
                    onClick={() => {
                      console.log('copy clicked !');
                    }}
                  />
                </Col>
              </Row>
              <SocialButtons />
            </Col>
          </Row>
        </div>

        <Tab.Container defaultActiveKey="Collection">
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="Collection" className="title-font">
                COLLECTION
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Sold" className="title-font">
                SOLD
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Created" className="title-font">
                CREATED
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Bought" className="title-font">
                BOUGHT
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="Collection">
              <Row>
                {nftUserFullDetail.userNfts.currentNfts?.map((item, index) => (
                  <Col xs="12" md="6" lg="4">
                    <ProductCard key={index} product={item} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Sold">
              <Row>
                {nftUserFullDetail.userNfts.soldNfts?.map((item, index) => (
                  <Col xs="12" md="6" lg="4">
                    <ProductCard key={index} product={item} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Created">
              <Row>
                {nftUserFullDetail.userNfts.createdNfts?.map((item, index) => (
                  <Col xs="12" md="6" lg="4">
                    <ProductCard key={index} product={item} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Bought">
              <Row>
                {nftUserFullDetail.userNfts.boughtNfts?.map((item, index) => (
                  <Col xs="12" md="6" lg="4">
                    <ProductCard key={index} product={item} />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};
export default ProfileDetail;
