import FileInput from 'components/Input/file';
import { useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Button } from 'components/button/Button';
import FileUpload from 'components/FileUpload';
import InfoText from 'components/Text';
import Input from 'components/Input';
import './index.scss';
import CategoryCard from './category';
import { useHistory } from 'react-router-dom';
import { useProfile } from 'state/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import toast from 'react-hot-toast';
import { getImageIpfsHash, readFileAsync } from 'utils/ipfs';
import { ethers } from 'ethers';
import { mint } from 'utils/contracts';
import API from 'utils/api';
import { useForm } from 'react-hook-form';

function Upload() {
  const history = useHistory();

  const { library, chainId, account } = useWeb3React<Web3Provider>();
  const { profile } = useProfile();
  const [nftImage, setNFTImage] = useState(null);
  const [nftName, setNFTName] = useState('');
  const [nftDecription, setNFTDecription] = useState('');
  const [nftPrice, setNFTPrice] = useState('');
  const [isLoading, setLoadingStatus] = useState(false);
  const [categories, setCategories] = useState<Array<string>>([]);

  const onChangeFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setNFTImage(e.target.files[0]);
    }
  };

  const onChangeNFTName = (value) => {
    console.log(value);
    setNFTName(value);
  };

  const onChangeNFTDescription = (e: any) => {
    setNFTDecription(e.target.value);
  };

  const onChangeNFTPrice = value => {
    setNFTPrice(value);
  };

  const onChangeCategories = (categories: string[]) => {
    setCategories(categories);
  };

  const submitAsset = async () => {
    if (!nftImage) {
      toast.error('Please select the Artist!');
      return;
    }

    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }

    if (!profile) {
      toast.error('Please login correctly!');
      return;
    }

    if (!nftName || !nftDecription || !nftPrice) {
      toast.error('Please Input All Fields correctly!');
      return;
    }

    setLoadingStatus(true);
    const load_toast_id = toast.loading('Please wait...');

    try {
      const buffer = await readFileAsync(nftImage);
      const hash = await getImageIpfsHash(buffer);
      const image_url = `https://ipfs.io/ipfs/${hash}`;

      var formdata = new FormData();

      formdata.append('nft_name', nftName);
      formdata.append('nft_description', nftDecription);
      formdata.append('nft_price', nftPrice);
      formdata.append('image_url', image_url);
      formdata.append('category', JSON.stringify(categories));

      var response: any = await API.post('/add_nft_metadata', formdata);

      if (response.status === 'success') {
        const base_id = response.base_id;

        const nft_unit_price = ethers.utils.parseEther(nftPrice);
        const tokenURI = `${API.apiUrl}/nfts/${base_id}`;
        const txhash = await mint(chainId, library.getSigner(), tokenURI, nft_unit_price);

        if (txhash !== false) {
          await API.get('/sync_block');
          toast.success('NFT Product is created successfully!');
          setTimeout(() => {
            history.push('/');
          }, 3000);
        } else {
          toast.error('NFT Art Upload Failed!');
        }
      } else {
        toast.error('NFT Art Upload Failed!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStatus(false);
      toast.dismiss(load_toast_id);
    }
  };

  return (
    <Container className="upload">
      <Row>
        <Col xl="12" lg="12" className="text-center">
          <InfoText size="xl" className="page-heading">
            Upload Here
          </InfoText>
          <InfoText className="page-sub-heading" variant="secondary">
            We do not own your private keys and cannot access your funds without your confirmation.
          </InfoText>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <InfoText className="text-center mt-5">What kind of item are you create ?</InfoText>
          <CategoryCard onChange={onChangeCategories} />
          <div className="file-container mt-5">
            <FileInput
              label="Choose File"
              dispalyImage
              info="PNG, GIF, JPEG, JPG (MAX 8 mb)"
              onChange={onChangeFile}
              defaultImage={nftImage && URL.createObjectURL(nftImage)}
            />
          </div>

          <form>
            <Input
              placeholder="NFT Name"
              label=""
              name="nft_name"
              onChange={onChangeNFTName}
            />
            <textarea
              placeholder="NFT Description (max: 300 characters)"
              name="nft_description"
              onChange={onChangeNFTDescription}
            />
            <Input
              type="number"
              placeholder="NFT Price"
              label=""
              name="nft_price"
              postfix="BNB"
              onChange={onChangeNFTPrice}
            />
          </form>

          <div className="fee">
            {/* <Row>
              <Col sm="12" xl="6" lg="12" className="text-left">
                <InfoText size="sm" variant="secondary">
                  Service Fee
                </InfoText>
              </Col>
              <Col xl="6" lg="12" sm="12" className="text-right">
                <InfoText size="sm" variant="secondary">
                  2.5%
                </InfoText>
              </Col>
            </Row>
            <Row>
              <Col xl="6" lg="12" sm="12" className="text-left">
                <InfoText size="sm" variant="secondary">
                  You will receive
                </InfoText>
              </Col>
              <Col xl="6" lg="12" sm="12"></Col>
            </Row> */}
          </div>

          <div className="text-center submit">
            <Button label=" Approve" variant="primary" isLoading={isLoading} onClick={submitAsset} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Upload;
