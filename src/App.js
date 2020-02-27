import React, { Component } from 'react';
import './assets/App.css';
import Layout from './hoc/Layout'
import BurgerMaker from './containers/BurgerMaker';

export default class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerMaker />
      </Layout>
    );
  }
}
