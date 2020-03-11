import React from 'react'
import Logo from "../Logo/Logo";
import NavItems from './NavItems/NavItems'
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle'

export default function Toolbar(props) {
    return (
        <header className="bg-red-700 w-full px-3 py-2 flex justify-center fixed top-0 left-0 border-b-2 border-gray-100">
            <div className="max-w-6xl w-full">
                <div className="flex items-center justify-between text-pink-500">
                    <DrawerToggle clicked={props.toggleClicked} />
                    <Logo />
                    <nav className="hidden sm:flex">
                        <NavItems isAuthenticated={props.isAuth} />
                    </nav>
                </div>
            </div>
        </header>
    )
}