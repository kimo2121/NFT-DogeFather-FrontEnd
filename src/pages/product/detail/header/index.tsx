import InfoText from 'components/Text';
import './index.scss';
import { Button } from 'components/button/Button';
import { Card, Col, Form, Image, Nav, Row, Tab } from 'react-bootstrap';
import ProfileImage from 'components/profile/ProfileImage';
import IconButton from 'components/button/icon';
import { useEffect, useState } from 'react';
import Input from 'components/Input';
import ProductHistory from '../history';
import toast from 'react-hot-toast';
import { baseApiUrl, truncateWalletString } from 'utils';
import { burn, buy, updateListingStatus, updatePrice } from 'utils/contracts';
import { useHistory } from 'react-router-dom';
import { useProfile, useProfileForWallet } from 'state/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const SideCard = ({ image, ownerName, userAvatarUrl, nftDetail }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card className="sise-card p-2 bg-onPrimary">
        <Card.Body className="p-0">
          <Card.Img variant="top" src={image} className="rounded-2 shadow" />

          <Card.Footer className="border-0 rounded-2 mt-2 border shadow bg-primary">
            <Row className="align-items-center m-0">
              <Col xs="12" sm="8" className="p-0">
                <Row className="align-items-center">
                  <Col className="pr-0" xs="auto">
                    <ProfileImage img={userAvatarUrl} verified />
                  </Col>
                  <Col>
                    <InfoText className="m-0" variant="secondary">
                      Owned by
                    </InfoText>
                    <InfoText className="m-0">{ownerName}</InfoText>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="4" className="pl-0 pr-0 pr-sm-3 text-center text-sm-left mt-3 mt-sm-0">
                <IconButton label="View History" icon="/img/history.svg" onClick={() => setModalShow(true)} />
              </Col>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
      {modalShow && <ProductHistory onClose={setModalShow} assetBaseId={nftDetail.nft?.baseID} />}
    </>
  );
};

const ProductDetailHeader = ({ name, description, price, image, ownerAddress, tokenID, listed, nftDetail }) => {
  const history = useHistory();

  const { profile: currentUserProfile } = useProfile();
  const { profile: productOwnerProfile } = useProfileForWallet(ownerAddress);
  const [loading, setLoading] = useState<boolean>(false);
  const [nftPrice, setNFTPrice] = useState();

  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  function isOwnsProduct() {
    return ownerAddress === currentUserProfile?.walletAddress;
  }

  const updateNFTListingStatus = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress !== account.toLowerCase()) {
      toast('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updateListingStatus(chainId, library.getSigner(), tokenID, !listed);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Listing Updated Successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Listing Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Listing Failed!');
    }
    setLoading(false);
  };

  const priceChangeHandler = async newPrice => {
    setNFTPrice(newPrice);
  };

  const updateNFTPrice = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress !== account.toLowerCase()) {
      toast('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await updatePrice(chainId, library.getSigner(), tokenID, nftPrice);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.dismiss(load_toast_id);
        toast.success('NFT Price is updated successfully!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Price Update Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Price Update Failed!');
    }
    setLoading(false);
  };

  const purchaseNFT = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress === account.toLowerCase()) {
      toast('You are current owner of this asset!');
      return;
    }

    if (listed === false) {
      toast('Currently not open for sale 🔒');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await buy(chainId, library.getSigner(), tokenID, price);
      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.success('Purchased this Assets!');
        setTimeout(() => {
          window.location.href = `/creatorDetail/${account}`;
        }, 3000);
      }
    } catch (error) {
      toast.error('Asset purchase failed!');
      console.log(error);
    }
    toast.dismiss(load_toast_id);
    setLoading(false);
  };

  const burnNFT = async () => {
    if (!loginStatus) {
      toast('Please connect correctly!');
      return;
    }
    if (ownerAddress !== account.toLowerCase()) {
      toast('You are not owner of this asset!');
      return;
    }

    setLoading(true);
    const load_toast_id = toast.loading('Please wait...');
    try {
      const txhash = await burn(chainId, library.getSigner(), tokenID);

      if (txhash !== false) {
        await fetch(`${baseApiUrl}/sync_block`);
        toast.dismiss(load_toast_id);
        toast.success('NFT is deleted permanently!');
        setTimeout(() => {
          history.push('/');
        }, 3000);
      } else {
        toast.dismiss(load_toast_id);
        toast.error('NFT Delete Failed!');
      }
    } catch (error) {
      toast.dismiss(load_toast_id);
      toast.error('NFT Delete Failed!');
    }
    setLoading(false);
  };

  function renderHeaderCta() {
    if (loginStatus === false) {
      return <></>;
    } else if (isOwnsProduct()) {
      return (
        <>
          <Row>
            <Col xs="12" sm="auto" className="pr-0 text-center">
              <Input type="number" placeholder="Price" name="price" value={price} onChange={priceChangeHandler} />
            </Col>
            <Col xs="12" sm="auto" className="pr-0 text-center">
              <Button label="Update Price" variant="outline-primary" isLoading={loading} onClick={updateNFTPrice} />
            </Col>
            {loginStatus && isOwnsProduct() && (
              <Col xs="12" sm="auto" className="pr-0 text-center">
                <Button
                  label={listed ? 'Disable for sale' : 'Enable for sale'}
                  isLoading={loading}
                  variant="primary"
                  onClick={updateNFTListingStatus}
                />
              </Col>
            )}
            <Col xs="12" sm="auto" className="pr-0 text-center">
              <Button label="Delete" variant="outline-primary" isLoading={loading} onClick={burnNFT} />
            </Col>
          </Row>
        </>
      );
    } else {
      return (
        <div className="justify-content-center justify-content-lg-start">
          <Button label="Buy now" isLoading={loading} variant="primary" onClick={purchaseNFT} />
        </div>
      );
    }
  }

  return (
    <div className="product-details-header">
      <Row className="align-items-center">
        <Col lg="6" className="ml-n0 ml-lg-n4">
          <SideCard
            image={image}
            ownerName={productOwnerProfile?.username || truncateWalletString(productOwnerProfile?.walletAddress)}
            userAvatarUrl={productOwnerProfile?.userAvatarUrl}
            nftDetail={nftDetail}
          />
        </Col>
        <Col lg="6" className="pl-3 pl-sm-5 mt-5 mt-lg-0">
          <h2 className="m-0 text-truncate">{name}</h2>
          <InfoText variant="secondary" size="md" className="m-0">
            {description}
          </InfoText>

          <Row className="mt-5 mb-2">
            <Col xs="auto">
              <InfoText size="md">{price} BNB</InfoText>
            </Col>
          </Row>
          <div className="header-cta">{renderHeaderCta()}</div>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetailHeader;
