import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck, Container } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Footer } from './components/footer/Footer';

import Header from './components/header/Header';
import HomePage from 'pages/home';
import AboutUSPage from 'pages/about';
import ProfileEdit from 'pages/profile/edit';
import ProfileDetail from 'pages/profile/detail';
import Upload from 'pages/upload';
import ProductDetails from 'pages/product/detail';
import FAQ from 'pages/faq';
import HowToBuy from 'pages/howToBuy';

import ExplorePage from 'pages/explore';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useFetchProfile, useFetchProfileList } from 'state/hooks';
import React from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  useEagerConnect();
  useFetchProfileList();
  useFetchProfile();

  return (
    <>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 }, error: { duration: 3000 } }} />
      <div className="app">
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <div className="body">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/aboutus" component={AboutUSPage} />
              <Route exact path="/profile/edit" component={ProfileEdit} />
              <Route exact path="/creatorDetail/:walletAddress" component={ProfileDetail} />
              <Route exact path="/upload" component={Upload} />
              <Route exact path="/details/:baseId" component={ProductDetails} />
              <Route exact path="/explore" component={ExplorePage} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/howTOBuy" component={HowToBuy} />
            </Switch>
            {/* <Route path="/discover" component={Discover} />
        <Route path="/create" component={Create} />
        <Route path="/details" component={Details} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/profile" component={Profile} />
        <Route path="/mynfts" component={MyNfts} />
        <Route path="/login" component={Login} />
      <Route path="/" exact component={Home} /> */}
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
