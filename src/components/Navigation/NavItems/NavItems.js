import React from 'react'
import NavItem from './NavItem/NavItem'
import styles from './NavItems.module.css'

export default function NavItems() {
    return (
        <ul className={styles.NavItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul>
    )
}
