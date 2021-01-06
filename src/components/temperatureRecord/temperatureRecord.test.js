import React from 'react';
import { shallow } from 'enzyme';
import TemperatureRecord from './temperatureRecord';

describe('TemperatureRecord', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TemperatureRecord />);
    expect(wrapper).toMatchSnapshot();
  });
});
