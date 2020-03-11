import React from 'react'
import NavItem from './NavItem/NavItem'

export default function NavItems(props) {
    return (
        <ul className="flex m-0 p-0 list-none items-center h-full">
            <NavItem link="/">Burger Maker</NavItem>
            {props.isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
            {props.isAuthenticated ? <NavItem link="/logout">Logout</NavItem>
                : <NavItem link="/auth">Login</NavItem> }
        </ul>
    )
}