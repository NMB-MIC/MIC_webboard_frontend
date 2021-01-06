import React from 'react';
import { shallow } from 'enzyme';
import CheckInPercentage from './CheckInPercentage';

describe('CheckInPercentage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CheckInPercentage />);
    expect(wrapper).toMatchSnapshot();
  });
});
