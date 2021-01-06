import React from 'react';
import { shallow } from 'enzyme';
import TrackInfected from './trackInfected';

describe('TrackInfected', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<TrackInfected />);
    expect(wrapper).toMatchSnapshot();
  });
});
