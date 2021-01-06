import React from 'react';
import { shallow } from 'enzyme';
import EmpTrack from './empTrackBus';

describe('EmpTrack', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<EmpTrack />);
    expect(wrapper).toMatchSnapshot();
  });
});
