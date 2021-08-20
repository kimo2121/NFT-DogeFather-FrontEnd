import { Button } from 'components/button/Button';
import CheckButton from 'components/button/check';
import InfoText from 'components/Text';
import { Card, Col, Container, Form, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import './index.scss';
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from '../../../state/hooks';
import useAuth from 'hooks/useAuth';
import { useHistory } from 'react-router';
import ConnectButton from '../../../components/Connect';
interface VisualPropsType {
  svg: string;
  style: any;
}
const VisualSVG = (props: VisualPropsType) => {
  return <Image src={props.svg} style={props.style} />;
};

interface HomeHeaderPropsType {
  isRequired?: boolean;
  onSubmit?: (data: { email: string }) => void;
}
const HomeHeader = (props: HomeHeaderPropsType) => {
  const { login } = useAuth();
  const history = useHistory();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loginStatus, setLoginStatus] = useState(false);
  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, active } = context;
  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  return (
    <div>
      <Container>
        <Card className="home-header-card border-0 p-0">
          {/* <Card.ImgOverlay className="back-visual">
            <Image src="/img/zig-zag.svg" className="zig-zag" />
            <Image src="/img/circle.svg" className="small-circle" />
            <Image src="/img/circle.svg" className="circle" />
            <Image src="/img/box.svg" className="small-box" />
            <Image src="/img/box.svg" className="box" />
            <Image src="/img/half-circle.svg" className="half-circle" />
            <Image src="/img/triangle.svg" className="triangle" />
          </Card.ImgOverlay> */}
          <Card.Body className="rounded-2">
            <Row className="mt-4">
              <Col>
                <InfoText size="lg" className="home-header-text mb-5 mt-5 mt-sm-0">
                  Start Your <br />
                  Own NFT Gallery
                </InfoText>
                <InfoText className="home-header-text2 mb-4">
                  We bring creative creators and the appreciation of their art together to move the art culture forward.
                </InfoText>
                <InfoText className="mb-4">
                  <ConnectButton loginStatus={loginStatus} profile={profile} />
                </InfoText>
              </Col>
              {/* <Col sm="5"></Col> */}
            </Row>
            {/* <Image src="/img/zig-zag.svg" className="zig-zag" />
            <Image src="/img/circle.svg" className="small-circle" />
            <Image src="/img/circle.svg" className="circle" />
            <Image src="/img/box.svg" className="small-box" />
            <Image src="/img/box.svg" className="box" />
            <Image src="/img/half-circle.svg" className="half-circle" />
            <Image src="/img/triangle.svg" className="triangle" /> */}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default HomeHeader;
