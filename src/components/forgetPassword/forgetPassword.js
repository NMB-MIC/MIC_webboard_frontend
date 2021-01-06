import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { APP_TITLE, OK, server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import * as actions from "./../../actions/register.action";

function isEmailAddress(str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str); // returns a boolean
}

class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
    };
  }
  async RequestNewPassword() {
    if (this.state.email === "" || this.state.email === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill your email",
      });
      return;
    }
    if (!isEmailAddress(this.state.email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "it not email address, please try again",
      });
      return;
    }

    try {
      let resultBackend = await httpClient.patch(server.USER_URL, {
        email: this.state.email,
      });
      if (resultBackend.data.api_result === OK) {
        Swal.fire({
          icon: "success",
          title: ":D  Request new password completed!",
          text: "Please wait email for new password and login again",
        });
        this.props.history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "server timeout pleae try again",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  }

  render() {
    return (
      <div
        class="hold-transition login-page"
        style={{ backgroundColor: "rgba(30, 30, 35, 0.8)" }}
      >
        <div
          className="login-box"
          style={{
            borderRadius: 8,
            backgroundColor: "WhiteSmoke",
            padding: 12,
          }}
        >
          <div className="login-logo">
            <a href="../Login">
              <br></br>
              <b>{APP_TITLE}</b>
            </a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              <form action="recover-password.html" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    autoFocus
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        this.RequestNewPassword();
                      }}
                      className="btn btn-primary btn-block"
                    >
                      Request new password
                    </button>
                  </div>
                  {/* /.col */}
                </div>
              </form>
              <p className="mt-3 mb-1">
                <Link to="/Login">Login</Link>
              </p>
              <p className="mb-0">
                <Link to="/register" className="text-center">
                  Register a new membership
                </Link>
              </p>
            </div>
            {/* /.login-card-body */}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
