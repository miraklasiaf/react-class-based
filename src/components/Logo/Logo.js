import React from 'react'
import logo from '../../assets/images/burger-logo.png'

export default function Logo(props) {
    return (
        <div className="bg-white p-2 box-border rounded">
            <img 
                src={logo}
                alt="Burger Junkie"
                className="h-full w-10 mx-auto"
            />
        </div>
    )
}
