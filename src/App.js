import React, { Component } from 'react';
import './assets/App.css';
import Layout from './hoc/Layout'
import BurgerMaker from './containers/BurgerMaker';
import Checkout from './containers/Checkout'
import ContactData from './containers/ContactData'
import NotFound from './components/404'
import Orders from './containers/Orders'
import Auth from './containers/Auth'
import Logout from './containers/Logout'
import { Router } from '@reach/router'
import { connect } from 'react-redux'
import * as action from './store/actions'

class App extends Component {
  componentDidMount() {
    this.props.trySignIn()
  }

  render() {
    return (
      <Layout>
        <Router className="w-full">
          <BurgerMaker path="/" />
          { this.props.isAuthenticated ? <Checkout path="checkout" >
            <ContactData path="contact-data" />
          </Checkout> : null }
          { this.props.isAuthenticated ? <Orders path="orders" /> : null }
          <Auth path="auth" />
          <Logout path="logout" />
          <NotFound default />
        </Router> 
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
  trySignIn: () => dispatch(action.authCheckState())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
