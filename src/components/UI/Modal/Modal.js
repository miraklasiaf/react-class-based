import React, {Component} from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

export default class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.isShow !== this.props.isShow
    }

    componentDidUpdate() {
        console.log('Modal re-render')
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop isShow={this.props.isShow} clicked={this.props.isClose} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.isShow ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.isShow ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Auxiliary>
        )
    }
}