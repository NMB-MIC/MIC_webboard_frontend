import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import verifyEmail from "./components/verifyEmail/verifyEmail";
import forgetPassword from './components/forgetPassword/forgetPassword';

import home from "./components/home/home";
import manage_divisionCode from "./components/manageMaster/divisionCode/divisionCode";
import create_divisionCode from "./components/manageMaster/create-divisionCode/create-divisionCode";

import manage_breakArea from "./components/manageMaster/breakArea/breakArea";
import create_breakArea from "./components/manageMaster/create-breakArea/create-breakArea";

import manage_AlertMail from "./components/manageMaster/alert-mail/alert-mail";
import create_AlertEmail from "./components/manageMaster/create-alertEmail/create-alertEmail";

import report_empTrackBus from "./components/Report/empTrackBus/empTrackBus";
import track_AreaBus from "./components/Report/trackPlateBus/trackPlateBus";

import homeImage from "./components/manageMaster/home-image/home-image";

import report_empTrackBreak from "./components/Report/empTrackBreak/empTrackBreak";
import report_checkIn from "./components/Report/CheckIn/CheckIn";
import Report_register from "./components/Report/register/register";
import report_temperature from "./components/Report/temperature/temperature";
import report_chekInPercentage from "./components/Report/CheckInPercentage/CheckInPercentage";
import report_trackInfected from './components/Report/trackInfected/trackInfected';
import report_noScanQR from './components/Report/noScanQR/noScanQR';

import temperature_record from "./components/temperatureRecord/temperatureRecord";

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
    localStorage.getItem(key.USER_LV) === "power" ||
    localStorage.getItem(key.USER_LV) === "admin"
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
              path="/verifyEmail/:username/:randomKey"
              component={verifyEmail}
            />
            <Route path="/login" component={Login} />
            <Route path="/temperature_record" component={temperature_record} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={home} />
            <Route path="/forgotPassword" component={forgetPassword} />

            <SecuredLVRoute
              path="/master/divisionCode"
              component={manage_divisionCode}
            />
            <SecuredLVRoute
              path="/master/Create/divisionCode"
              component={create_divisionCode}
            />
            <SecuredLVRoute
              path="/master/breakArea"
              component={manage_breakArea}
            />
            <SecuredLVRoute
              path="/master/Create/breakArea"
              component={create_breakArea}
            />
            <SecuredLVRoute
              path="/master/AlertMail"
              component={manage_AlertMail}
            />
            <SecuredLVRoute
              path="/master/Create/AlertMail/"
              component={create_AlertEmail}
            />
            <SecuredLVRoute
              path="/master/homeImageSlide"
              component={homeImage}
            />

            <SecuredRoute
              path="/Report/EmpTrackBus"
              component={report_empTrackBus}
            />
            <SecuredRoute
              path="/track_PlateBus/:Plate&:Update"
              component={track_AreaBus}
            />
            <SecuredRoute
              path="/Report/EmpTrackBreak"
              component={report_empTrackBreak}
            />

            <SecuredLVRoute
              path="/Report/Temperature"
              component={report_temperature}
            />
            <SecuredRoute
              path="/Report/checkInPercentage"
              component={report_chekInPercentage}
            />
            <SecuredRoute
              path="/Report/trackInfected"
              component={report_trackInfected}
            />
            <SecuredRoute
              path="/Report/reportNoScanQR"
              component={report_noScanQR}
            />

            <SecuredRoute path="/Report/CheckIn" component={report_checkIn} />
            <SecuredRoute path="/Report/register" component={Report_register} />

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
