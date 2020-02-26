import React from 'react'
import logo from "../../assets/logo.svg";

export default function Toolbar() {
    return (
        <div className="flex bg-white fixed border-b border-gray-200 h-16 top-0 z-90 inset-x-0 items-center">
            <div className="w-full max-w-screen-xl relative mx-auto px-6">
                <div className="flex items-center -mx-6">
                    <div className="lg:w-1/4 xl:w-1/5 pl-6 pr-6 lg:pr-8">
                        <div className="flex items-center">
                            <span>Menu</span>
                        </div>
                    </div>
                    <div className="flex flex-grow lg:w-3/4 xl:w-4/5">
                        <div className="w-full lg:px-6 xl:w-3/4 xl:px-12">
                            <div className="relative">
                                <img
                                    src={logo}
                                    className="h-16 w-16 rounded-full mx-auto App-logo"
                                    alt="logo"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}