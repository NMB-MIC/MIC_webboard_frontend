import React from 'react';
import { shallow } from 'enzyme';
import Jobs_progressive from './jobs_progressive';

describe('Jobs_progressive', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Jobs_progressive />);
    expect(wrapper).toMatchSnapshot();
  });
});
