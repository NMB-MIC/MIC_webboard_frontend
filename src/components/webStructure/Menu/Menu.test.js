import React from 'react';
import { shallow } from 'enzyme';
import Menu from './Menu';

describe('Menu', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
