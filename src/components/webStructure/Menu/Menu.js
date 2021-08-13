import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { key } from "../../../constants";

class Menu extends Component {

  componentDidMount = () => {

  }
  // /master/userManage
  renderManageMaster = (pathname) => {
    if (
      localStorage.getItem(key.USER_LV) === "MIC_Member" ||
      localStorage.getItem(key.USER_LV) === "admin" ||
      localStorage.getItem(key.USER_LV) === "MIC_Head"
    ) {
      return (
        <li className="nav-item has-treeview">
          <a
            href="#"
            className={
              pathname.includes('/master')
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
            </li>
            <li className="nav-item">
              <Link
                to="/master/userManage"
                className={
                  pathname === "/master/userManage"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>User manage</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/master/jobProcessMaster"
                className={
                  pathname === "/master/jobProcessMaster"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                <i className="far fa-circle nav-icon" />
                <p>jobProcessMaster</p>
              </Link>
            </li>
          </ul>
        </li>
      )
    }
  }

  renderMIC_jobs = (pathname) => {
    return (
      <li className="nav-item has-treeview">
        <a
          href="#"
          className={
            pathname.includes('/mic_jobs')
              ? "nav-link active"
              : "nav-link"
          }
        >
          <i
            className="nav-icon iconify"
            data-icon="bi:bar-chart-line-fill"
          />
          <p>
            MIC Jobs
                      <i className="right fas fa-angle-left" />
          </p>
        </a>
        <ul className="nav nav-treeview" style={{ display: "none" }}>
          <li className="nav-item">
            <Link
              to="/mic_jobs/jobs_request"
              className={
                pathname === "/mic_jobs/jobs_request"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>Job request</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/mic_jobs/jobs_progressive"
              className={
                pathname === "/mic_jobs/jobs_progressive"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>Job progressive</p>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/mic_jobs/success_story"
              className={
                pathname === "/mic_jobs/success_story"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>Success story</p>
            </Link>
          </li>
        </ul>
      </li>
    )
  }

  renderQc_tools = (pathname) => {
    return (
      <li className="nav-item has-treeview">
        <a
          href="#"
          className={
            pathname.includes('/qc_tools/')
              ? "nav-link active"
              : "nav-link"
          }
        >
          <i
            className="nav-icon iconify"
            data-icon="fa-solid:tools"
          />
          <p>
            QC tools
            <i className="right fas fa-angle-left" />
          </p>
        </a>
        <ul className="nav nav-treeview" style={{ display: "none" }}>
          <li className="nav-item">
            <Link
              to="/qc_tools/p_chart"
              className={
                pathname === "/qc_tools/p_chart"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              <i className="far fa-circle nav-icon" />
              <p>P-chart</p>
            </Link>
          </li>
        </ul>
      </li>
    )
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <Link className="brand-link" to="/home">
          <img
            src="/images/MIC_Logo.png"
            alt="MIC Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">MIC Job Progressive</span>
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

          {/* Sidebar Menu */}

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {this.renderMIC_jobs(pathname)}
              {this.renderManageMaster(pathname)}
              {this.renderQc_tools(pathname)}
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
