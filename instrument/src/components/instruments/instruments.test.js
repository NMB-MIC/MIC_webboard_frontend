import React from "react";
import { shallow } from "enzyme";
import Instruments from "./instruments";

describe("Instruments", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Instruments />);
    expect(wrapper).toMatchSnapshot();
  });
});
