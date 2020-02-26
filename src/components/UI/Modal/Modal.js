import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

export default function Modal(props) {
    return (
        <Auxiliary>
            <Backdrop isShow={props.isShow} clicked={props.isClose} />
            <div
                className="Modal"
                style={{
                    transform: props.isShow ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.isShow ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Auxiliary>
    )
}
