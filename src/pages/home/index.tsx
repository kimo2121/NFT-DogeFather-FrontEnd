import './index.scss';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/cards/product';
import { CardDeck, Col, Container, Form, Image, Row } from 'react-bootstrap';
import ExploreCard from 'pages/home/explore';
import ArtistCard from 'pages/home/artist';
import HomeHeader from './header';
import Dialog from 'components/modal';
import { Button } from '../../components/button/Button';

import artistList from './artistList.json';
import exploreList from './exploreList.json';
import filterModalItems from './filterModalItems.json';
import productList from './productList.json';
import InfoText from 'components/Text';
import { useHistory } from 'react-router-dom';
import { NFTObjectData, useGetNFTList, useGetNFTTopArtists } from 'hooks/useApi';
import { Home_List } from './constant';
import { Explore } from './explore/Explore';
import { useDisplayMode } from '../../hooks/useDisplayMode';

let total = 0;

const HomePage = () => {
  const [isFilterModal, setFilterModal] = useState(false);
  const { setIsHomepage } = useDisplayMode();
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
  });

  useEffect(() => {
    setStart(0);
    setNFTObjectList([]);
  }, [category, sortField, sortOrder]);

  useEffect(() => {
    setIsHomepage(true);
    return () => {
      setIsHomepage(false);
    };
  });

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

  function onSelectCategory(explore: Explore) {
    if (explore.title === 'All') setCategory('');
    else setCategory(explore.title);
  }

  function onFilterBy(filter) {
    if (filter === 'Default') {
      setSortField('');
      setSortOrder('');
    } else if (filter === 'Cheapest') {
      setSortField('price');
      setSortOrder('asc');
    } else if (filter === 'Expensive') {
      setSortField('price');
      setSortOrder('desc');
    } else if (filter === 'Recently Added') {
      setSortField('createdAt');
      setSortOrder('desc');
    }
  }

  const topArtistList = useGetNFTTopArtists();

  return (
    <>
      <HomeHeader
        isRequired
        onSubmit={data => {
          console.log(data.email);
        }}
      />

      <ArtistCard className="mt-5" artistList={topArtistList} />

      <Container>
        <div>
          <ExploreCard
            className="mt-5"
            exploreList={exploreList}
            onClick={onSelectCategory}
            onFilterClick={() => setFilterModal(true)}
          />
          <Dialog
            show={isFilterModal}
            label={<InfoText className="m-0">Filter By</InfoText>}
            border
            className="filter-modal"
            onHide={() => setFilterModal(false)}
          >
            <Form.Group onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterBy(e.target.value)}>
              {filterModalItems.map((item, i) => (
                <Form.Check
                  key={i}
                  name="filter-radio-btn"
                  type="radio"
                  value={item}
                  label={item}
                  id={`frb${i}`}
                  defaultChecked={i == 2 ? true : false}
                />
              ))}
            </Form.Group>
          </Dialog>
        </div>

        <Row className="mt-5 mb-3 cards-home-container">
          {NFTObjectList.map((product, i) => (
            <Col xs="12" md="6" lg="4" key={i}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
      {renderLoadMore()}
    </>
  );
};
export default HomePage;
