/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <strong>
          Copyright © 2023 <a style={{color: "blue"}}>Developed by MIC DIV.</a>.
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.1
        </div>
      </footer>
    );
  }
}

export default Footer;
