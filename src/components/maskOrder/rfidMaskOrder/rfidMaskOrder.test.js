import React from 'react';
import { shallow } from 'enzyme';
import RfidMaskOrder from './rfidMaskOrder';

describe('RfidMaskOrder', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<RfidMaskOrder />);
    expect(wrapper).toMatchSnapshot();
  });
});
