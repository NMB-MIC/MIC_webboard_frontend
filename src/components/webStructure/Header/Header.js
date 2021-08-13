import React, { Component } from "react";
import { key } from "../../../constants";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "../../../actions/app.action";
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
              role="button"
            ></a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <span class="iconify" data-icon="ic:outline-emoji-people"></span>
              {this.getUserEmp()}
            </a>
            <div
              className="dropdown-menu dropdown-menu-lg dropdown-menu-right"
              style={{ left: "inherit", right: 0 }}
            >
              <span className="dropdown-item dropdown-header">
                <span
                  class="iconify"
                  data-icon="bi:people-fill"
                  data-inline="true"
                ></span>{" "}
                User menu
              </span>
              <div className="dropdown-divider" />
              <Link to="/changePassword" className="dropdown-item">
                <span
                  class="iconify"
                  data-icon="carbon:password"
                  data-inline="true"
                ></span>{" "}
                Change password
                <span className="float-right text-muted text-sm"></span>
              </Link>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                onClick={() => {
                  this.props.history.push("/Login");
                  localStorage.removeItem(key.LOGIN_PASSED);
                  localStorage.removeItem(key.API_KEY);
                  localStorage.removeItem(key.USER_NAME);
                  localStorage.removeItem(key.USER_LV);
                  localStorage.removeItem(key.USER_EMP);
                  localStorage.removeItem(key.TOKEN);
                  this.props.appReducer.app.forceUpdate();
                }}
              >
                <span
                  class="iconify"
                  data-icon="si-glyph:sign-out"
                  data-inline="true"
                ></span>{" "}
                Sign out
                <span className="float-right text-muted text-sm"></span>
              </button>
              <div className="dropdown-divider" />

              <a href="#" className="dropdown-item dropdown-footer"></a>
            </div>
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
