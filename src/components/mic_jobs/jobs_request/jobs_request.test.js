import React from 'react';
import { shallow } from 'enzyme';
import Jobs_request from './jobs_request';

describe('Jobs_request', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Jobs_request />);
    expect(wrapper).toMatchSnapshot();
  });
});
