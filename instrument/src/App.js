import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Component } from "react";

import { APP_TITLE } from "./constants";
//import HookMqtt from './components/MQTT_Hook/'

// Components from Utils
import Header from "./components/header/header";
import SideMenu from "./components/sideMenu/sideMenu";
import Footer from "./components/footer/footer";
import Home from "./components/home/Home";
import Main from "./components/main/Main";
import Mitutoyo from "./components/instruments/mitutoyo";
import Instrument from "./components/instruments/instrument";
import XbarChart from "./components/xbarChart/xbarChart";

// const isLoggedIn = () => {
//   //return true if === YES
//   return localStorage.getItem(key.LOGIN_PASSED) === YES;
// };
// const SecuredRoute = ({ children }) => {
//   if (isLoggedIn()) {
//     return children;
//   }
//   return <Navigate to="/login" />;
// };

// const SecuredRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={isLoggedIn() === true ? <Component /> : <Navigate to="/login" />}
//   />
// );

// const SecuredAdminRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={
//       isLoggedIn() === true ? (
//         localStorage.getItem(key.USER_LV) === "admin" ? (
//           <Component />
//         ) : (
//           <Navigate to="/main" />
//         )
//       ) : (
//         <Navigate to="/login" />
//       )
//     }
//   />
// );

class App extends Component {
  componentDidMount() {}

  redirectToHome = () => {
    return <Navigate to="/home" />;
  };
  render() {
    document.title = APP_TITLE;

    return (
      <BrowserRouter>
      
        <div className="App">
      
    
          {<Header />}
          {<SideMenu />}

          <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="/main" element={<Main />} />

            <Route path="/mitutoyo" element={<Mitutoyo />} />
            <Route path="/instrument" element={<Instrument />} />
            <Route path="/xbarChart" element={<XbarChart />} />

            <Route path="/" element={<this.redirectToHome />} />
            <Route path="*" element={<this.redirectToHome />} />
          </Routes>

          {<Footer />}
        </div>
      
      </BrowserRouter>
    );
  }
}
export default App;
