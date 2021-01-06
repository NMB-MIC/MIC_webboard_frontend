import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

class Menu extends Component {
  render() {
    const { pathname } = this.props.location;

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link className="brand-link" to="/home">
          <img
            src="/images/Covid19_logo.png"
            alt="MIC Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">NMB Covid19</span>
        </Link>
        {/* Sidebar */}{" "}
        <div className="sidebar"><Scrollbars
            onScroll={this.handleScroll}
            onScrollFrame={this.handleScrollFrame}
            onScrollStart={this.handleScrollStart}
            onScrollStop={this.handleScrollStop}
            onUpdate={this.handleUpdate}
            renderView={this.renderView}
            renderTrackHorizontal={this.renderTrackHorizontal}
            renderTrackVertical={this.renderTrackVertical}
            renderThumbHorizontal={this.renderThumbHorizontal}
            renderThumbVertical={this.renderThumbVertical}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight={true}
            autoHeightMin={0}
            autoHeightMax={2000}
            thumbMinSize={50}
            universal={true}
          >
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="/images/NMB_logo.png"
                className="img-circle elevation-2"
                alt="User Image"
              />
            </div>
            <div class="info">
              <a
                href="http://minebea.co.th/th/management/"
                target="blank"
                class="d-block"
              >
                NMB-Minebea Thai Ltd.
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                <li className="nav-item has-treeview">
                  <a
                    href="#"
                    className={
                      pathname === "/Report/EmpTrackBus" ||
                      pathname === "/Report/EmpTrackBreak" ||
                      pathname === "/Report/CheckIn" ||
                      pathname === "/Report/register" ||
                      pathname === "/Report/temperature" ||
                      pathname === "/Report/trackInfected" ||
                      pathname === "/Report/reportNoScanQR" ||
                      pathname === "/Report/checkInPercentage"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="bi:bar-chart-line-fill"
                    />
                    <p>
                      Reports
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/Report/trackInfected"
                        className={
                          pathname === "/Report/trackInfected"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Track Infected</p>
                      </Link>
                    </li>
                    
                    <li className="nav-item">
                      <Link
                        to="/Report/reportNoScanQR"
                        className={
                          pathname === "/Report/reportNoScanQR"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>No scan QR code</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/EmpTrackBus"
                        className={
                          pathname === "/Report/EmpTrackBus"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Emp track by bus</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/EmpTrackBreak"
                        className={
                          pathname === "/Report/EmpTrackBreak"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Emp track by break</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/CheckIn"
                        className={
                          pathname === "/Report/CheckIn"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>checkIn Count</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/checkInPercentage"
                        className={
                          pathname === "/Report/checkInPercentage"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>checkIn percentage</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/register"
                        className={
                          pathname === "/Report/register"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Report register</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Report/temperature"
                        className={
                          pathname === "/Report/temperature"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Report temperature</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item has-treeview">
                  <a
                    href="#"
                    className={
                      pathname === "/master/divisionCode" ||
                      pathname === "/master/Create/divisionCode" ||
                      pathname === "/master/breakArea" ||
                      pathname === "/master/Create/breakArea" ||
                      pathname === "/master/AlertMail" ||
                      pathname === "/master/Create/AlertMail" ||
                      pathname === "/master/homeImageSlide" ||
                      pathname === "/master/Create//homeImageSlide"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="cil:list-numbered"
                    />
                    <p>
                      Manage master
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/master/divisionCode"
                        className={
                          pathname === "/master/divisionCode" ||
                          pathname === "/master/Create/divisionCode"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Division code</p>
                      </Link>
                      <Link
                        to="/master/breakArea"
                        className={
                          pathname === "/master/breakArea" ||
                          pathname === "/master/Create/breakArea"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Break area</p>
                      </Link>
                      <Link
                        to="/master/AlertMail"
                        className={
                          pathname === "/master/AlertMail" ||
                          pathname === "/master/Create/AlertMail"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Alert email</p>
                      </Link>
                      <Link
                        to="/master/homeImageSlide"
                        className={
                          pathname === "/master/homeImageSlide" ||
                          pathname === "/master/Create/homeImageSlide"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>Home image slide</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item has-treeview">
                  <a
                    href="#"
                    className={
                      pathname === "/temperature_record"
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    <i
                      className="nav-icon iconify"
                      data-icon="carbon:data-table-reference"
                    />
                    <p>
                      Record
                      <i className="fas fa-angle-left right" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview" style={{ display: "none" }}>
                    <li className="nav-item">
                      <Link
                        to="/temperature_record"
                        className={
                          pathname === "/temperature_record"
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        <i className="far fa-circle nav-icon" />
                        <p>temperature record&nbsp;</p>
                        <span
                          class="iconify"
                          data-icon="fa-solid:temperature-high"
                          data-inline="true"
                        ></span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </Scrollbars>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
    );
  }
}

export default withRouter(Menu);
