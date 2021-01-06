import React from 'react';
import { shallow } from 'enzyme';
import HomeImage from './home-image';

describe('HomeImage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<HomeImage />);
    expect(wrapper).toMatchSnapshot();
  });
});
