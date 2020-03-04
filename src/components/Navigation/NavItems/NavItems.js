import React from 'react'
import NavItem from './NavItem/NavItem'

export default function NavItems() {
    return (
        <ul className="flex m-0 p-0 list-none items-center h-full">
            <NavItem link="/">Burger Maker</NavItem>
            <NavItem link="/orders">Orders</NavItem>
        </ul>
    )
}