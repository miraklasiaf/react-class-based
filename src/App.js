import React, { Component } from 'react';
import './assets/App.css';
import Layout from './hoc/Layout'
import BurgerMaker from './containers/BurgerMaker';
import Checkout from './containers/Checkout'
import ContactData from './containers/ContactData'
import NotFound from './components/404'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import { Router } from '@reach/router'

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Router className="w-full">
          <BurgerMaker path="/" />
          <Checkout path="checkout" >
            <ContactData path="contact-data" />
          </Checkout>
          <Orders path="orders" />
          <Auth path="auth" />
          <NotFound default />
        </Router> 
      </Layout>
    );
  }
}
