import React from 'react'
import styles from './NavItem.module.css'

export default function NavItem(props) {
    return (
        <li className={styles.NavItem}>
            <a href={props.link} className={props.active ? 'active' : null}>{props.children}</a>
        </li>
    )
}
