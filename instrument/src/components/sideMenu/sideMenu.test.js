import React from 'react';
import { shallow } from 'enzyme';
import SideMenu from './sideMenu';

describe('SideMenu', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<SideMenu />);
    expect(wrapper).toMatchSnapshot();
  });
});
