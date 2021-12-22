import React from 'react';
import { shallow } from 'enzyme';
import X_bar_r_chart from './x_bar_r_chart';

describe('X_bar_r_chart', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<X_bar_r_chart />);
    expect(wrapper).toMatchSnapshot();
  });
});
