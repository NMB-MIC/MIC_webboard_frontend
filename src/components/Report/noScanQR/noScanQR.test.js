import React from 'react';
import { shallow } from 'enzyme';
import NoScanQR from './noScanQR';

describe('NoScanQR', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<NoScanQR />);
    expect(wrapper).toMatchSnapshot();
  });
});
