import React from 'react';
import { shallow } from 'enzyme';
import TrackAreaBus from './trackAreaBus';

describe('TrackAreaBus', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TrackAreaBus />);
    expect(wrapper).toMatchSnapshot();
  });
});
