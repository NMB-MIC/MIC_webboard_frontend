import React from 'react';
import { shallow } from 'enzyme';
import JobProcessMaster from './jobProcessMaster';

describe('JobProcessMaster', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<JobProcessMaster />);
    expect(wrapper).toMatchSnapshot();
  });
});
