import React from 'react';
import { shallow } from 'enzyme';
import EmpTrackBreak from './empTrackBreak';

describe('EmpTrackBreak', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<EmpTrackBreak />);
    expect(wrapper).toMatchSnapshot();
  });
});
