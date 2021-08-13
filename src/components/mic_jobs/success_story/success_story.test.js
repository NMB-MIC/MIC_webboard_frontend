import React from 'react';
import { shallow } from 'enzyme';
import Success_story from './success_story';

describe('Success_story', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Success_story />);
    expect(wrapper).toMatchSnapshot();
  });
});
