import React from 'react';
import { shallow } from 'enzyme';
import CreateAlertEmail from './create-alertEmail';

describe('CreateAlertEmail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateAlertEmail />);
    expect(wrapper).toMatchSnapshot();
  });
});
