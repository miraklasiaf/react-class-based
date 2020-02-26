import React from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar'

const layout = props => (
  <Auxiliary>
    <Toolbar />
    <main className="mt-32">
        {props.children}
    </main>
  </Auxiliary>
);

export default layout