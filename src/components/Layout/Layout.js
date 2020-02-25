import React from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import logo from "../../assets/logo.svg";

const layout = props => (
  <Auxiliary>
    <div className="m-6 bg-gray-600 rounded-lg p-6 shadow-lg hover:bg-blue-600">
      <img
        src={logo}
        className="h-32 w-32 rounded-full mx-auto App-logo"
        alt="logo"
      />
      <h1 className="text-white text-3xl">Toolbar, SideDrawer, Backdrop</h1>
    </div>
    <main>
        {props.children}
    </main>
  </Auxiliary>
);

export default layout