import React from 'react';
import { shallow } from 'enzyme';
import DivisionCode_manage from './divisionCode';

describe('DivisionCode_manage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DivisionCode_manage />);
    expect(wrapper).toMatchSnapshot();
  });
});
