import InfoText from 'components/Text';
import { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './index.scss';

interface ParaCardPropsType {
  left: any;
  right: any;
  bottom?: any;
}
const ParaCard = (props: ParaCardPropsType) => {
  return (
    <>
      <Row>
        <Col xs={{ order: 2, span: '12' }} sm="7" className="text-center text-sm-left mt-5 mt-sm-0">
          {props.left}
        </Col>
        <Col xs={{ order: 1, span: '12' }} sm="5">
          {props.right}
        </Col>
      </Row>
      {props.bottom && (
        <Row>
          <Col>{props.bottom}</Col>
        </Row>
      )}
    </>
  );
};

const HowToBuy = () => {
  return (
    <>
      <Container>
        <InfoText size="xl" className="m-0 text-center page-heading">
          HOW TO BUY DOGEFATHER (BSC) TOKEN
        </InfoText>
        <InfoText variant="secondary" className="mb-5 pb-5 text-center page-sub-heading">
          A SHORT GUIDE TO PURCHASING DOGEFATHER TOKEN WITH BINANCE COIN
        </InfoText>
      </Container>

      <Container className="mt-5 pt-5">
        <ParaCard
          left={
            <>
              <InfoText size="lg">INSTALL METAMASK WALLET</InfoText>
              <InfoText variant="secondary">
                Metamask is a browser extension & mobile app that acts as a wallet used to store BEP-20 (BSC) such as
                DOGEFATHER.
              </InfoText>
              <InfoText variant="secondary">
                Follow the instructions from Metamask on how to install the wallet in your browser or device.
              </InfoText>
              <InfoText size="lg">ADD BSC NETWORK</InfoText>
              <InfoText variant="secondary">
                You will need to add the Binance Smart Chain Network (BSC) to be able to buy the DOGEFATHER
              </InfoText>
              <InfoText variant="secondary">
                Firstly, select the button on the top labeled "Ethereum Mainnet" (default value) in your Metamask wallet
                and click 'Custom RPC" and Enter the Details below:
              </InfoText>
            </>
          }
          right={
            <div className="card bg-primary justify-content-center align-items-center right-img">
              <Image src="/img/c-bg-1.png" />
            </div>
          }
          bottom={
            <div className="card border bg-onPrimary shadow rounded-1  px-3 py-4 mt-4">
              <InfoText variant="secondary" className="mb-1">
                Network Name: Binance Smart Chain
              </InfoText>
              <InfoText variant="secondary" className="mb-1">
                New RPC URL: https://bsc-dataseed.binance.org/
              </InfoText>
              <InfoText variant="secondary" className="mb-1">
                Chain ID: 56
              </InfoText>
              <InfoText variant="secondary" className="mb-1">
                Symbol: BNB
              </InfoText>
              <InfoText variant="secondary" className="mb-1">
                Block Explorer URL: https://bscscan.com
              </InfoText>
            </div>
          }
        />
      </Container>

      <div className="bg-primary shadow border my-5 py-5">
        <Container>
          <ParaCard
            left={
              <>
                <InfoText size="lg" className="mb-0">
                  CREATE A BINANCE ACCOUNT
                  <br /> TO PURCHASE BINANCE COIN (BNB)
                </InfoText>
                <InfoText variant="secondary">
                  You will need to create a Binance Account to purchase Binence Coin (BNB). Alternatively, you can also
                  look into using Binance Bedge.
                </InfoText>
                <InfoText variant="secondary">
                  To create a Binance account go :o Binance.com and create an account or log into you Binance account if
                  you already have one.
                </InfoText>

                <InfoText size="lg" className="mt-4 mb-0">
                  EXCHANGE / BUY BNB
                </InfoText>
                <InfoText variant="secondary">
                  Exchange BTC, ETH or any other supported token for BNB on the binarce exchang. You can also directly
                  buy BNB on the exchange with Fiat.
                </InfoText>

                <InfoText size="lg" className="mt-4 mb-0">
                  WITHDRAW BNB TO METAMASK
                </InfoText>
                <InfoText variant="secondary">
                  In your Binancy account, Open your BNB wallet then tap on withdraw. Select Binance Smart Chain (BSC)
                  as the Transfer Network.
                </InfoText>
              </>
            }
            right={
              <div className="card bg-primary justify-content-center align-items-center right-img">
                <Image src="/img/c-bg-1.png" />
              </div>
            }
            bottom={
              <>
                <div className="card border bg-onPrimary shadow rounded-1 px-3 py-4 mt-4">
                  <InfoText variant="secondary" className="mb-1">
                    Ensure that you select that you want to withdraw BER-20 (BSC) tokens.
                  </InfoText>
                </div>
                <InfoText variant="secondary" className="my-2 text-center text-sm-left">
                  Copy your address from your Metamask wallet and choose the amount you want to withdraw
                </InfoText>
                <div className="card border bg-onPrimary shadow rounded-1 px-3 py-4 mt-4">
                  <InfoText variant="secondary" className="mb-1">
                    Make sure the network tab in your Metarnask wakt is set to 'Binance Smart Chain'
                  </InfoText>
                </div>
                <InfoText variant="secondary" className="my-2 text-center text-sm-left">
                  Complete the steps to withdraw.
                  <br /> Wait for the exchange to process your request.
                  <br /> Once it is confirmed, you will immediately receive BNB to your Smart Chain address.
                </InfoText>
              </>
            }
          />
        </Container>
      </div>

      <Container className="mt-5 pt-5">
        <ParaCard
          left={
            <>
              <InfoText size="lg">ADD DOGEFATHER TO YOUR WALLET</InfoText>
              <InfoText variant="secondary">
                Make sure the network tab in your Metamask wallet is set to 'Binance Smart Chain'
                <br /> In your Metamask wallet scroll down to the button 'Add Token'
                <br /> Select "Custom Token'
                <br /> Paste the DOGEFATHER contract address into the "Token Contract Address' field.
                <br /> All other fields will automatically be filled in.
              </InfoText>

              <div className="card border bg-onPrimary shadow rounded-1  px-3 py-4 my-5">
                <InfoText variant="secondary" className="mb-1">
                  Ox3D29Aa78t13558F84112bbC48a84F371147A920C9
                </InfoText>
              </div>

              <InfoText variant="secondary">
                In your metamask wallet scroll down to the button "Add Token'
                <br /> Click 'Next' then click "Add Token'
                <br />
                Congratulations your now a DOGEFATHER TOKEN holder!
              </InfoText>
            </>
          }
          right={
            <div className="card bg-primary justify-content-center align-items-center right-img">
              <Image src="/img/logo.svg" />
            </div>
          }
        />
      </Container>

      <div className="bg-primary shadow border my-5 py-5">
        <Container>
          <ParaCard
            left={
              <>
                <InfoText size="lg" className="mb-5">
                  EXCHANGE BNB FOR DOGEFATHER
                  <br /> ON PANCAKESWAP
                </InfoText>
                <InfoText variant="secondary">
                  Make sure the network tab in your Metamask wallet is set to "Binance Smart Chain' Follow the
                  PancakeSwap link to exchange on website and swap your BNB for Dogefather. Make sure slippage is set to
                  11-15% by selecting the gear icon next to the "Exchange" title.
                </InfoText>
              </>
            }
            right={
              <div className="card bg-primary justify-content-center align-items-center right-img">
                <Image src="/img/c-bg-1.png" />
              </div>
            }
            bottom={
              <>
                <div className="card border bg-onPrimary shadow rounded-1 px-3 py-4 mt-4">
                  <InfoText variant="secondary" className="mb-1">
                    Ensure when swapping BNB for DOGEFATHER the Official contract address is selected for the 'to"
                    token.
                    <br /> Official DOGEFATHER token Address:
                    <br /> Ox3D29Aa78fB558F84112bbC48.384F371147A92009
                  </InfoText>
                </div>
              </>
            }
          />
        </Container>
      </div>
    </>
  );
};
export default HowToBuy;
