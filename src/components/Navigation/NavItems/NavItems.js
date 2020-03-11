import React from 'react'
import NavItem from './NavItem/NavItem'
import styles from './NavItems.module.css'

export default function NavItems(props) {
    return (
        <ul className={styles.NavItems}>
            <NavItem link="/">Burger Maker</NavItem>
            {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
            {props.isAuthenticated ? <NavItem link="/logout">Logout</NavItem> : <NavItem link="/auth">Login</NavItem> }
        </ul>
    )
}