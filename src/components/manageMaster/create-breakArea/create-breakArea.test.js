import React from 'react';
import { shallow } from 'enzyme';
import CreateBreakArea from './create-breakArea';

describe('CreateBreakArea', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateBreakArea />);
    expect(wrapper).toMatchSnapshot();
  });
});
