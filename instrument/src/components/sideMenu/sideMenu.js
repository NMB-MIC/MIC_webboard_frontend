/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 40,
      fontWeight: "bold",
    };
  }
  render() {
    const divStyle = {
      fontWeight: 600,
      fontSize: "1.4rem",
      color: "white",
    };

    const divStyle1 = {
      fontWeight: 600,
      fontSize: "1.2rem",
      color: "yellow",
      marginLeft: "4px",
    };

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="../../index3.html" className="brand-link">
          <span
            className="brand-text font-weight-light"
            style={{
              fontWeight: this.state.fontWeight,
              fontSize: this.state.fontSize + "px",
              marginLeft: "15px",
              color: "white",
            }}
          >
            MIC Division
          </span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a>
                <img
                  src="dist/img/NMB_logo.png"
                  style={{ width: "210px", marginRight: "70px" }}
                  alt="User Image"
                ></img>
              </a>
            </div>
          </div>
          <div className="form-inline"></div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <a className="nav-link active">
                  <i className="nav-icon fas fa-columns" />
                  <p style={divStyle}>Measuring</p>
                  <i />
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to="/instrument" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p style={divStyle}>Equipment</p>
                      </Link>
                    </a>

                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a className="nav-link">
                          <Link to="/mitutoyo" className="nav-link">
                            <i className="far fa-circle nav-icon" />
                            <p style={divStyle1}>Mitutoyo</p>
                          </Link>
                        </a>
                      </li>
                    </ul>
             
                  </li>
                </ul>
              </li>
              <li className="nav-item menu-open">
                <a className="nav-link active">
                  <i className="nav-icon fas fa-columns" />
                  <p style={divStyle}>Chart</p>
                  <i />
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link">
                      <Link to="/xbarchart" className="nav-link">
                        <i className="far fa-dot-circle nav-icon" />
                        <p style={divStyle}>X-bar</p>
                      </Link>
                    </a>

                    {/* <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <a className="nav-link">
                          <Link to="/mitutoyo" className="nav-link">
                            <i className="far fa-circle nav-icon" />
                            <p style={divStyle}>Mitutoyo</p>
                          </Link>
                        </a>
                      </li>
                    </ul>
              */}
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    );
  }
}

export default SideMenu;
