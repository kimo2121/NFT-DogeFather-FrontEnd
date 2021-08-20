import {
  Col,
  Container,
  Form,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  OverlayTrigger,
  Popover,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Header.scss';
import { useEffect, useState } from 'react';
import UserDropDown from './UserDropDown';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from 'state/hooks';
import { ethers } from 'ethers';
import { truncateWalletString } from 'utils';
import { useContext } from 'react';
import { DisplayModeContext, useDisplayMode } from '../../hooks/useDisplayMode';
import ConnectButton from 'components/Connect';

const Header = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const { isHomepage } = useDisplayMode();
  const history = useHistory();

  let userName = '';
  let userAvatar = '/img/user-icon.svg';

  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, active } = context;

  const { profile } = useProfile();

  let [etherBalance, setEtherBalance] = useState('0.00');

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
      library.getBalance(account).then(balance => {
        const etherVal = parseFloat(ethers.utils.formatEther(balance));
        setEtherBalance(etherVal.toFixed(4));
      });
    }
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId, profile]);

  if (profile) {
    userName = profile.username ? profile.username : truncateWalletString(profile.walletAddress);
    userAvatar = profile.userAvatarUrl ? profile.userAvatarUrl : '/img/user-icon.svg';
  }

  const onSearchFormSubmit = async (event) => {
    event.preventDefault();
    history.push(`/explore?search=${searchKey}`);
  }

  const onChangeSearchBar = async (event) => {
    setSearchKey(event.target.value);
  }

  return (
    <Navbar collapseOnSelect expand="sm" variant="dark" className="header-nav">
      <Container>
        <div className="d-flex align-items-center">
          <Navbar.Brand>
            <Link to="/">
              <Image src="/img/logo.svg" fluid />
            </Link>
          </Navbar.Brand>
          <Form onSubmit={onSearchFormSubmit}>
            <InputGroup className="header-search" onChange={onChangeSearchBar}>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Image src="/img/search.png" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl />
            </InputGroup>
          </Form>
        </div>

        <div className="profile justify-content-end">
          <Nav>
            {/* <Link to="/faq" className="nav-link">
              FAQ's
            </Link> */}
            {/* <Link to="/product/detail" className="nav-link">
              P
            </Link> */}
            {/* <Link to="/explore" className="nav-link">
              Explore
            </Link> */}
            {/* <Link to="/aboutUS" className="nav-link">
              About
            </Link> */}
            {/* <Link to="/howTOBuy" className="nav-link">
              How to Buy
            </Link> */}
            {/* <Link to="/upload" className="nav-link">
              Upload
            </Link> */}
            {/* <Link to="/profile/detail" className="nav-link">
              NFTs
            </Link> */}
            <Nav.Item>
              <div className="connection-action">
                {loginStatus && profile && (
                  <div className="connect-action">
                    {!isHomepage && <ConnectButton loginStatus={loginStatus} profile={profile} />}
                    {etherBalance} BNB
                    <UserDropDown
                      userName={userName}
                      userAvatar={userAvatar}
                      balance={etherBalance}
                      walletAddress={account}
                    />
                  </div>
                )}
              </div>
            </Nav.Item>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
