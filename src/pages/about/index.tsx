import InfoText from 'components/Text';
import { Container } from 'react-bootstrap';
import { Card1, Card2 } from './card';
import './index.scss';

const AboutUSCard = () => {
  return (
    <Container className="about-container">
      <InfoText size="xl" className="text-center m-0 page-heading">
        OUR PURPOSE
      </InfoText>
      <InfoText variant="secondary" className="text-center mb-3 sub-heading">
        'STARTED WITH A MEME,GROWING WITH A PURPOSE.'-DOGEFATHER COMMUNITY
      </InfoText>

      <Card1 />

      <Card2
        className="mt-5"
        title="MEME-BASED"
        text="Like crypto, memes were born on the internet and have journeyed from the fringes to the mainstream. They're
          used to drive adoption of cryptocurrency, signal bullishness or bearishness on certain assets or coins by
          traders and even boost the value of tokens."
      />
      <Card2
        className="mt-5"
        title="CHARITY "
        text="With the large attention the world will give to Dogefather, we would like to remind everyone that giving is as important as receiving. By donating to charity, we will make the world a better and happier place."
      />
      <Card2
        className="mt-5"
        title="COLLABORATION"
        text="Connecting traditional artists into the exciting world of using NFTs (Non-fungible tokens). Partnership with NFT collectors to source new exciting artworks."
      />
      <Card2
        className="mt-5"
        title="EDUCATION"
        text="Cryptocurrency and DeFi is here to stay, we hope to use memes to bridge the gap between the young and the old and encourage the younger generation to learn more about decentralisation and finance."
      />
      <Card2
        className="mt-5"
        title="TRANSPARENCY"
        text="We believe our supporters and users are our most valuable asset. We are open to any and all creative ideas and concepts to add to our road map of upcoming projects. We want everyone to have a voice and feel like part of the teaml We will add the best ideas to the voting protocol and let the community decide."
      />
    </Container>
  );
};
export default AboutUSCard;
