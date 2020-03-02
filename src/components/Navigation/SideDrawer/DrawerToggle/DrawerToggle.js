import React from 'react'
import Hamburger from '../../../UI/Hamburger'

export default function DrawerToggle(props) {
    return (
        <div onClick={props.clicked} className="sm:hidden">
            <Hamburger />
        </div>
    )
}