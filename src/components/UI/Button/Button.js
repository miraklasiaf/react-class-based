import React from 'react'
import './Button.css'

export default function Button(props) {
    return (
        <button
            onClick={props.clicked}
            className={["Button", props.btnType].join(' ')}
        >{props.children}</button>
    )
}
