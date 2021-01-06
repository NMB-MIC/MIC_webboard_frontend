import React from 'react';
import { shallow } from 'enzyme';
import VerifyEmail from './verifyEmail';

describe('VerifyEmail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<VerifyEmail />);
    expect(wrapper).toMatchSnapshot();
  });
});
