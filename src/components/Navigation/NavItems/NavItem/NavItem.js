import React from 'react'
import styles from './NavItem.module.css'
import { Link } from '@reach/router'

const NavLink = props => (
    <Link
        {...props}
        getProps={({ isCurrent }) => {
            return {
                style: {
                    color: isCurrent ? "gray" : "white"
                }
            };
        }}
    />
);

export default function NavItem(props) {
    return (
        <li className={styles.NavItem}>
            <NavLink to={props.link}>{props.children}</NavLink>
        </li>
    )
}
