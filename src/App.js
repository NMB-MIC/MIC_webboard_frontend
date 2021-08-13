import Header from "./components/webStructure/Header";
import Menu from "./components/webStructure/Menu";
import Footer from "./components/webStructure/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import verifyEmail from "./components/verifyEmail/verifyEmail";
import forgetPassword from './components/forgetPassword/forgetPassword';
import changePassword from './components/changePassword'

import home from "./components/home/home";

//manage master
import manage_divisionCode from "./components/manageMaster/divisionCode/divisionCode";
import create_divisionCode from "./components/manageMaster/create-divisionCode/create-divisionCode";
import user_manage from './components/manageMaster/userManage'
import jobProcessMaster from './components/manageMaster/jobProcessMaster'

//MIC Jobs
import jobs_progressive from './components/mic_jobs/jobs_progressive'
import jobs_request from './components/mic_jobs/jobs_request'
import success_story from './components/mic_jobs/success_story'
import jobs_detail from './components/mic_jobs/jobs_detail'
import editJobDetail from './components/mic_jobs/editJobDetail';

//qc tools
import p_chart from './components/qc_tools/p_chart'

import { APP_TITLE } from "./constants/index";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { Component } from "react";
import { key, YES } from "./constants";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";

const isLoggedIn = () => {
  return localStorage.getItem(key.LOGIN_PASSED) === YES;
};

const isPowerUser = () => {
  if (
    localStorage.getItem(key.USER_LV) === "MIC_Member" ||
    localStorage.getItem(key.USER_LV) === "admin" ||
    localStorage.getItem(key.USER_LV) === "MIC_head"
  ) {
    return true;
  } else {
    return false;
  }
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const SecuredLVRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? (
        isPowerUser() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    document.title = APP_TITLE;
    return (
      <Router>
        <div className="">
          {isLoggedIn() && <Header />}
          {isLoggedIn() && <Menu />}
          <Switch>
            <Route
              path="/verifyEmail/:username/:registerKey"
              component={verifyEmail}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={home} />
            <Route path="/forgotPassword" component={forgetPassword} />
            <SecuredRoute path='/changePassword' component={changePassword} />

            {/* manageMaster */}
            <SecuredLVRoute
              path="/master/divisionCode"
              component={manage_divisionCode}
            />
            <SecuredLVRoute
              path="/master/Create/divisionCode"
              component={create_divisionCode}
            />
            <SecuredLVRoute
              path="/master/userManage"
              component={user_manage}
            />
            <SecuredLVRoute
              path='/master/jobProcessMaster'
              component={jobProcessMaster} />

            {/* mic Jobs */}
            < SecuredRoute
              path="/mic_jobs/jobs_request"
              component={jobs_request}
            />
            <SecuredRoute
              path="/mic_jobs/jobs_progressive"
              component={jobs_progressive}
            />
            <SecuredRoute
              path="/mic_jobs/success_story"
              component={success_story}
            />
            <Route
              path="/mic_jobs/job_detail/:job_id"
              component={jobs_detail}
            />
            <SecuredRoute path="/mic_jobs/edit_job_detail/:job_id"
              component={editJobDetail} />


            {/* qc tools */}
            <SecuredRoute
              path="/qc_tools/p_chart/"
              component={p_chart}
            />

            <Route exact={true} path="/" component={this.redirectToLogin} />
            <Route exact={true} path="*" component={this.redirectToLogin} />
          </Switch>
          {isLoggedIn() && <Footer />}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
