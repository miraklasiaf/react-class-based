import React from 'react'
import NavItem from './NavItem/NavItem'

export default function NavItems() {
    return (
        <ul className="flex m-0 p-0 list-none items-center h-full">
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul>
    )
}