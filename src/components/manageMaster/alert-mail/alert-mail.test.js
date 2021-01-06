import React from 'react';
import { shallow } from 'enzyme';
import AlertMail from './alert-mail';

describe('AlertMail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<AlertMail />);
    expect(wrapper).toMatchSnapshot();
  });
});
