import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as action from '../store/actions'
import { Redirect } from '@reach/router'

class Logout extends Component {
    constructor(props) {
        super(props)
        this.props.logout()
    }

    render() {
        return <Redirect to="/" noThrow />
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(action.logout())
})

export default connect(null, mapDispatchToProps)(Logout)
