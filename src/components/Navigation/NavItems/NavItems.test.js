import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavItems from './NavItems'
import NavItem from './NavItem/NavItem'

configure({adapter: new Adapter()})

describe('<NavItems />', () => {
    let wrapper; 

    beforeEach(() => { wrapper = shallow(<NavItems />) })

    it('render two nav items if not authenticated', () => {
      expect(wrapper.find(NavItem)).toHaveLength(2)
    })

    it("render three nav items if authenticated", () => {
      wrapper.setProps({isAuthenticated: true})
      expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it("render nav logout if authenticated", () => {
      wrapper.setProps({ isAuthenticated: true });
      expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true);
    });
})