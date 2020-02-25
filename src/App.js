import React, { Component } from 'react';
import './assets/App.css';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'

export default class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}
