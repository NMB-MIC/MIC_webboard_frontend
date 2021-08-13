import React from 'react';
import { shallow } from 'enzyme';
import UserManage from './userManage';

describe('UserManage', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<UserManage />);
    expect(wrapper).toMatchSnapshot();
  });
});
