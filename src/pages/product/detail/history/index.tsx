import Dialog from 'components/modal';
import { Card, Col, Form, Image, Nav, Row, Tab } from 'react-bootstrap';
import InfoText from '../../../../components/Text/index';
import './index.scss';
import History from './History.json';
import Owner from './Owner.json';
import { getContractInfo, truncateHashString, truncateWalletString } from 'utils';
import { useGetUserList, useGetNFTDetail } from 'hooks/useApi';
import moment from 'moment';
import { NFTDetail } from '../../../../hooks/useApi';

export default function ProductHistory({ onClose, assetBaseId }) {
  const contractAddress = getContractInfo('DogeFatherNFT').address;
  const nftDetail: NFTDetail = useGetNFTDetail(assetBaseId);

  const nft_user_list = useGetUserList();
  if (!nftDetail) {
    return null;
  }

  var sorted_nft_events = nftDetail?.historyEvents?.sort((evt1, evt2) => {
    if (evt1.doneOn > evt2.doneOn) return -1;
    if (evt1.doneOn < evt2.doneOn) return 1;
    return 0;
  });

  var event_list = [];
  const AvatarImg = '/img/default-profile.png';

  for (var i = 0; i < sorted_nft_events.length; i++) {
    let doneOn = sorted_nft_events[i].doneOn;
    let eventType = sorted_nft_events[i].eventType;

    let user_wallet = '';
    let user_image = '';
    let user_name = '';
    let user_verified = false;
    let event_content = '';
    let event_date = moment(doneOn * 1000).fromNow();

    if (eventType === 0) {
      let minter = sorted_nft_events[i].minter;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === minter);

      user_wallet = minter;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(minter);
      user_verified = user && user.verified ? user.verified : false;
      event_content = 'The NFT was minted';
    } else if (eventType === 1) {
      // let seller = sorted_nft_events[i].seller;
      let buyer = sorted_nft_events[i].buyer;
      let nftSoldAtPrice = sorted_nft_events[i].nftSoldAtPrice;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === buyer);

      user_wallet = buyer;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(buyer);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Bought at ${nftSoldAtPrice} BNB`;
    } else if (eventType === 2) {
      let priceUpdater = sorted_nft_events[i].priceUpdater;
      let newNftPrice = sorted_nft_events[i].newNftPrice;
      // let oldNftPrice = sorted_nft_events[i].oldNftPrice;

      let user = null;
      if (nft_user_list) user = nft_user_list.find(user => user.walletAddress === priceUpdater);

      user_wallet = priceUpdater;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : AvatarImg;
      user_name = user && user.username ? user.username : truncateWalletString(priceUpdater);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Put on sale for ${newNftPrice} BNB`;
    } else {
      continue;
    }

    event_list.push({
      user_wallet: user_wallet,
      user_image: user_image,
      user_name: user_name,
      user_verified: user_verified,
      event_content: event_content,
      event_date: event_date,
    });
  }

  function historyContent() {
    return (
      <>
        {event_list.map(event => (
          <Row className="sub-card m-0 content" role="button">
            <Col xs="auto" className="avatar pl-4">
              <Image src={event.user_image} className="rounded" />
            </Col>
            <Col className="fixed-size-col">
              <InfoText className="mb-1 text-ellipsis user-name">{event.user_name}</InfoText>
              <InfoText size="sm" className="mb-1 text-ellipsis history-info">
                {event.event_content}
              </InfoText>
              <InfoText size="sm" variant="secondary" className="mb-0 text-ellipsis">
                {event.event_date}
              </InfoText>
            </Col>
          </Row>
        ))}
      </>
    );
  }

  function productOwnerContent() {
    return (
      <>
        <Row className="sub-card ml-0 mr-0 content py-1" role="button">
          <Col xs="auto" className="avatar pl-4">
            <Image src={nftDetail?.owner.userAvatarUrl} className="rounded" />
          </Col>
          <Col className="fixed-size-col">
            <InfoText variant="secondary" className="mb-1 text-ellipsis">
              Owner
            </InfoText>
            <InfoText className="mb-0 text-ellipsis">{nftDetail?.owner.username}</InfoText>
          </Col>
        </Row>
        <Row className="sub-card ml-0 mr-0 content py-1" role="button">
          <Col xs="auto" className="avatar pl-4">
            <Image src={nftDetail?.creator.userAvatarUrl} />
          </Col>
          <Col className="fixed-size-col">
            <InfoText variant="secondary" className="mb-1 text-ellipsis">
              Creator
            </InfoText>
            <InfoText className="mb-0 text-ellipsis">{nftDetail?.creator.username}</InfoText>
          </Col>
        </Row>
      </>
    );
  }
  function productInfoContent() {
    return (
      <div className="pl-4">
        <InfoText variant="secondary">NFT ID</InfoText>
        <InfoText>{nftDetail?.nft.tokenID}</InfoText>
        <InfoText variant="secondary">MINT Transcation</InfoText>
        <InfoText>{truncateHashString(nftDetail?.nft.mintTransactionHash)}</InfoText>
        <InfoText variant="secondary">Contact Address</InfoText>
        <InfoText variant="primary">{truncateWalletString(contractAddress)}</InfoText>
      </div>
    );
  }
  return (
    <Dialog show={true} onHide={() => onClose(false)} className="history-menu-modal">
      <Tab.Container defaultActiveKey="history">
        <Nav variant="tabs" className="border-0">
          <Nav.Item>
            <Nav.Link eventKey="owner">
              <InfoText size="md" className="m-0">
                OWNER
              </InfoText>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="history">
              <InfoText size="md" className="m-0">
                HISTORY
              </InfoText>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="info">
              <InfoText size="md" className="m-0">
                INFO
              </InfoText>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="cstm-scroll">
          <Tab.Pane eventKey="owner">{productOwnerContent()}</Tab.Pane>
          <Tab.Pane eventKey="history">{historyContent()}</Tab.Pane>
          <Tab.Pane eventKey="info">{productInfoContent()}</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Dialog>
  );
}
