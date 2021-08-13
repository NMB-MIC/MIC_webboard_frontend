import React from 'react';
import { shallow } from 'enzyme';
import P_chart from './p_chart';

describe('P_chart', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<P_chart />);
    expect(wrapper).toMatchSnapshot();
  });
});
