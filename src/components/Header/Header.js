import React, { Component } from "react";
import { key } from "../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../actions/login.action";
import { Link } from "react-router-dom";

class Header extends Component {
  getUserEmp = () => {
    return " Welcome : " + localStorage.getItem(key.USER_EMP);
  };
  render() {
    return (
      <nav className="main-header navbar navbar-expand navbar-dark">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
        </ul>

        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          <li class="nav-item" style={{ marginRight: 5, color: "white" }}>
            <a
              class="nav-link"
              data-widget="control-sidebar"
              data-slide="true"
              href="#"
              role="button"
            >
              <span class="iconify" data-icon="ic:outline-emoji-people"></span>
              {this.getUserEmp()}
            </a>
          </li>
          <li class="nav-item">
            <a
              href="#"
              class="btn btn-danger btn-flat"
              onClick={() => {
                this.props.history.push("/Login");
                localStorage.removeItem(key.LOGIN_PASSED);
                localStorage.removeItem(key.API_KEY);
                localStorage.removeItem(key.USER_NAME);
                localStorage.removeItem(key.USER_LV);
                localStorage.removeItem(key.USER_EMP);
                this.props.appReducer.app.forceUpdate();
              }}
            >
              Sign out
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
});

const mapDispatchToProps = {
  ...action,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
