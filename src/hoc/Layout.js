import React, {Component} from 'react'
import Auxiliary from './Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../components/Navigation/Toolbar'
import SideDrawer from '../components/Navigation/SideDrawer/SideDrawer'

export default class Layout extends Component {
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
      <Auxiliary>
        <Toolbar toggleClicked={this.handleToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClose} 
        />
        <main className={styles.Content}>
          {this.props.children}
        </main>
      </Auxiliary>
    )
  }
}