import React from 'react';
import { shallow } from 'enzyme';
import Main_menu from './main_menu';

describe('Main_menu', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Main_menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
