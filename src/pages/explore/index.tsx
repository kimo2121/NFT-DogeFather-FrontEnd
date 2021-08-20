import './index.scss';
import ProductCard from '../../components/cards/product';
import { CardDeck, Col, Container, Row } from 'react-bootstrap';
import { Button } from '../../components/button/Button';
import ExploreCard from 'pages/home/explore';
import ArtistCard from 'pages/home/artist';
import ExploreCategory from './category';
import InfoText from 'components/Text';
import PopularItems from './Popular.json';
import NewItems from './New.json';
import AuctionItems from './Auction.json';
import { useEffect, useState } from 'react';
import { Home_List } from 'pages/home/constant';
import { NFTObjectData, useGetNFTList } from 'hooks/useApi';
import { parse, ParsedQs } from 'qs'
import { useLocation } from 'react-router-dom';

const ExplorePage = (): ParsedQs => {
  const { search } = useLocation();
  const searchKey = parse(search, { parseArrays: false, ignoreQueryPrefix: true })["search"];

  const [NFTObjectList, setNFTObjectList] = useState<NFTObjectData[]>([]);

  const [loading, setLoading] = useState(false);

  const [start, setStart] = useState(0);
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  function isAlreadyAdded(item: NFTObjectData) {
    return NFTObjectList?.find(list => list.baseID === item.baseID);
  }

  const items = useGetNFTList({
    start,
    count: Home_List.size,
    category: category,
    sort_field: sortField,
    sort_order: sortOrder,
    search_key: searchKey,
  });

  useEffect(() => {
    setStart(0);
    setNFTObjectList([]);
  }, [category, sortField, sortOrder, searchKey]);

  useEffect(() => {
    if (items?.nfts?.length) {
      const newNFTObjectList = [...NFTObjectList];
      if (!items?.nfts.find(item => isAlreadyAdded(item))) {
        newNFTObjectList.push(...items.nfts);
        setLoading(false);
      }
      setNFTObjectList(newNFTObjectList);
    }
  }, [items]);

  function loadMoreItem() {
    setLoading(true);
    setStart(start + Home_List.size);
  }

  function renderLoadMore() {
    if (items?.total_count > NFTObjectList.length) {
      return (
        <Row>
          <Col className="text-center load-more-action">
            <Button
              label="Load More"
              variant="primary"
              onClick={loadMoreItem}
              isLoading={loading}
              loadingMessage="Loading..."
            />
          </Col>
        </Row>
      );
    }
    return null;
  }

  return (
    <>
      <Container>
        <InfoText size="xl" className="mb-0 mb-sm-2 page-heading">
          Explorer
        </InfoText>

        {/* <ExploreCategory title="Popular Games" products={PopularItems} onClick={() => {}} />
      <ExploreCategory title="New!" products={NewItems} onClick={() => {}} />
      <ExploreCategory title="On Auction" products={AuctionItems} onClick={() => {}} /> */}

        <div className="category">
          <Row>
            {NFTObjectList.map((product, index) => (
              <Col xl="4" md="4" key={index}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      {renderLoadMore()}
    </>
  );
};
export default ExplorePage;
