import React from "react";
import { shallow } from "enzyme";
import XbarChart from "./xbarChart";

describe("XbarChart", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<XbarChart />);
    expect(wrapper).toMatchSnapshot();
  });
});
