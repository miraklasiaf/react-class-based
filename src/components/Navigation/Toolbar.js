import React from 'react'
import Logo from "../Logo/Logo";
import NavItems from './NavItems/NavItems'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'
import styles from './Toolbar.module.css'

export default function Toolbar(props) {
    return (
        <header className={styles.Toolbar}>
            <DrawerToggle clicked={props.toggleClicked} />
            <Logo />
            <nav className={styles.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
    )
}