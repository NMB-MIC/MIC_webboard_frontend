import React from 'react';
import { shallow } from 'enzyme';
import BreakArea from './breakArea';

describe('BreakArea', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<BreakArea />);
    expect(wrapper).toMatchSnapshot();
  });
});
