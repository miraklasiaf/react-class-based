import React, {Component} from 'react'
import Auxiliary from './Auxiliary'
import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  handleSideDrawerClose = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  handleToggle = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Auxiliary className="flex flex-col items-center w-full">
        <Toolbar toggleClicked={this.handleToggle} isAuth={this.props.isAuthenticated} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClose}
        />
        <main className="w-full flex flex-col items-center mt-8">
          {this.props.children}
        </main>
      </Auxiliary>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout)