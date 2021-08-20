import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import './index.scss';
import InfoText from '../../../components/Text/index';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import FileInput from 'components/Input/file';
import IconButton from 'components/button/icon';
import { useProfile } from 'state/hooks';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { truncateWalletString } from 'utils';
import toast from 'react-hot-toast';
import { getImageIpfsHash, readFileAsync } from 'utils/ipfs';
import API from 'utils/api';

export default function ProfileEdit() {
  const history = useHistory();
  let data = useLocation().state;

  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const { profile } = useProfile();

  const Socials = [
    { label: 'Website', icon: '/img/earth.svg', value: profile && profile.websiteUrl },
    { label: 'Twitter', icon: '/img/twitter.svg', value: profile && profile.twitterUrl },
    { label: 'Instagram', icon: '/img/instagram.svg', value: profile && profile.instagramUrl },
    { label: 'Telegram', icon: '/img/telegram.svg', value: profile && profile.telegramUrl },
    { label: 'Discord', icon: '/img/discord.svg', value: profile && profile.discordUrl },
    { label: 'Youtube', icon: '/img/youtube.svg', value: profile && profile.youtubeUrl },
    { label: 'Facebook', icon: '/img/facebook.svg', value: profile && profile.facebookUrl },
    { label: 'TikTok', icon: '/img/tiktok.svg', value: profile && profile.tiktokUrl },
    { label: 'Dribbble', icon: '/img/dribbble.svg', value: profile && profile.dribbleUrl },
    { label: 'Behance', icon: '/img/behance.svg', value: profile && profile.behanceUrl },
  ];

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
    console.log(profile);
  }, [connector, library, account, active, chainId]);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const [avatarImage, setAvatarImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setBackgroundImage(e.target.files[0]);
    }
  };

  const onUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setAvatarImage(e.target.files[0]);
    }
  };

  const onSubmit = async data => {
    //console.log(data);
    if (!profile) {
      toast.error('Profile Update Failed!');
      return;
    }

    if (!loginStatus) {
      toast.error('Please connect Metamask Correctly!');
      return;
    }

    try {
      setLoading(true);

      var user_avatar_url = profile.userAvatarUrl;
      var user_background_url = profile.userBackgroupUrl;

      if (avatarImage) {
        const buffer = await readFileAsync(avatarImage);
        const hash = await getImageIpfsHash(buffer);
        user_avatar_url = `https://ipfs.io/ipfs/${hash}`;
      }

      if (backgroundImage) {
        const buffer = await readFileAsync(backgroundImage);
        const hash = await getImageIpfsHash(buffer);
        user_background_url = `https://ipfs.io/ipfs/${hash}`;
      }

      data.wallet_address = profile.walletAddress;
      data.social_url = '';
      data.user_avatar_url = user_avatar_url;
      data.user_background_url = user_background_url;

      console.log(data);
      API.post('/update_nft_user_profile', data)
        .then(res => {
          console.log(res);
          toast.success('Your Profile Updated!');
          setTimeout(function () {
            window.location.replace("/");
          }, 2000);
        })
        .catch(error => {
          toast.error('Profile Update Failed!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error('Profile Update Failed!');
    }
  };
  if (!profile) {
    return null;
  }
  return (
    <div className="user-edit">
      <Row className="banner justify-content-center">
        <FileInput
          label="Edit"
          defaultImage={profile && profile.userBackgroupUrl}
          dispalyImage={true}
          info="We recommend to upload images in 1920 x 300 resolution"
          onChange={onBannerChange}
        />
      </Row>
      <Container>
        <div className="user-block">
          <ProfileImage img={profile && profile.userAvatarUrl} edit blurBG onChange={onUserAvatarChange} verified />
          <InfoText variant="secondary" size="sm" className="mt-1">
            We recommend an image at least 120 X 120 resolution
          </InfoText>

          <Row>
            <Col xl="4" lg="4">
              <InfoText size="lg" className="m-0 text-truncate username">
                {profile && (profile.username || truncateWalletString(profile.walletAddress))}
              </InfoText>
              <Row>
                <Col xs="auto" className="pr-0">
                  <InfoText variant="secondary" size="md" className="mb-2 sub-title-text">
                    {profile && profile.userBio}
                  </InfoText>
                </Col>
                <Col xs="auto" className="pl-0">
                  <IconButton icon="/img/copy.svg" rounded />
                </Col>
              </Row>
              <SocialButtons />
            </Col>
          </Row>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 pt-3">
          <Row>
            <Col xs="12" lg="6" className="text-center">
              <InfoText size="md" className="mb-1 mt-3 text-left">
                Display Name
              </InfoText>
              <Input name="username" value={profile?.username} register={register} />
              {/* <InfoText size="md" className="mb-1 mt-3 text-left">
                Your Email
              </InfoText>
              <Input name="email" /> */}
              <InfoText size="md" className="mb-1 mt-3 text-left">
                Add Bio
              </InfoText>
              <textarea
                defaultValue={profile?.userBio}
                {...register('user_bio', { required: false })}
              />

              <Button
                className="mt-3 d-none d-lg-block m-auto"
                isLoading={loading}
                type="submit"
                variant="primary"
                label="Save Changes"
              />
            </Col>
            <Col xs="12" lg="6" className="socials">
              <InfoText className="details mt-5 mt-lg-0">Add links to your social media profile</InfoText>
              {Socials.map((social, index) => (
                <Row key={index} className="align-items-center mb-3">
                  <Col xs="auto">
                    <img className="svg-img" src={social.icon} />
                  </Col>
                  <Col xs="auto" className="pl-0">
                    <InfoText size="md" className="m-0">
                      {social.label}
                    </InfoText>
                  </Col>
                  <Col xs="12">
                    <Input name={social.label} value={social.value} register={register} />
                  </Col>
                </Row>
              ))}

              <Button
                className="mt-3 d-block d-lg-none m-auto"
                isLoading={loading}
                type="submit"
                variant="primary"
                label="Save Changes"
              />
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}
function success(res: any): Function {
  throw new Error('Function not implemented.');
}
