import React from 'react';
import { shallow } from 'enzyme';
import ForgetPassword from './forgetPassword';

describe('ForgetPassword', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<ForgetPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
