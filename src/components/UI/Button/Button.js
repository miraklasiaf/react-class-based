import React from 'react'
import styles from './Button.module.css'

export default function Button(props) {
    return (
        <button
            onClick={props.clicked}
            disabled={props.disabled}
            className={[styles.Button, styles[props.btnType]].join(' ')}
        >{props.children}</button>
    )
}
