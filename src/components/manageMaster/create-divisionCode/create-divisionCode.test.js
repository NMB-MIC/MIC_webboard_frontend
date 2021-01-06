import React from 'react';
import { shallow } from 'enzyme';
import CreateDivisionCode from './create-divisionCode';

describe('CreateDivisionCode', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateDivisionCode />);
    expect(wrapper).toMatchSnapshot();
  });
});
