import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "./../../actions/register.action";
import { getDivCode } from "./../../actions/division_code.action";
import { APP_TITLE } from "./../../constants/index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      empNumber: "",
      divisionCode: "",
      email: "",
    };
  }

  componentDidMount() {
    this.props.getDivCode();
    document.title = APP_TITLE + " Register";
  }

  showError = () => {
    const { errorMessage } = this.props.registerReducer;
    return <div></div>;
  };

  divisionCodeReander = () => {
    const { result, isFetching } = this.props.divcodeReducer;
    if (!isFetching) {
      try {
        const myResult = result.result;
        return myResult.map((item) => (
          <option value={item.divisionCode}>{item.divisionName}</option>
        ));
      } catch (error) {}
    }
  };

  render() {
    return (
      <div
        class="register-page"
        style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", height: 757 }}
      >
        <div
          className="register-box"
          style={{
            borderRadius: 8,
            backgroundColor: "WhiteSmoke",
            padding: 12,
          }}
        >
          <div className="login-logo">
            <b>{APP_TITLE}</b>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Register your account</p>
              <form>
                {/* Username */}
                <div className="input-group mb-3">
                  <input
                    maxlength="20"
                    onChange={(e) => {
                      this.setState({ username: e.target.value });
                    }}
                    name="username"
                    type="text"
                    className="form-control"
                    placeholder="User name"
                    autoFocus
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                {/* Emp Number */}
                <div className="input-group mb-3">
                  <input
                  maxlength="6"
                    onChange={(e) => {
                      this.setState({ empNumber: e.target.value });
                    }}
                    name="empNumber"
                    type="text"
                    className="form-control"
                    placeholder="Employee Number"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user" />
                    </div>
                  </div>
                </div>
                {/* password */}
                <div className="input-group mb-3">
                  <input
                    maxlength="20"
                    onChange={(e) => {
                      this.setState({ password: e.target.value });
                    }}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {/* confirmpassword */}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      this.setState({ confirmPassword: e.target.value });
                    }}
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock" />
                    </div>
                  </div>
                </div>
                {/* email */}
                <div className="input-group mb-3">
                  <input
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="email"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                {/* divisionCode */}
                <div class="form-group">
                  <label>Division Code :</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      this.setState({ divisionCode: e.target.value });
                    }}
                    name="divisionCode"
                    type="text"
                    className="form-control"
                  >
                    <option>--Please select division code--</option>
                    {this.divisionCodeReander()}
                  </select>
                </div>

                {/* Alarm error Code */}
                {this.props.registerReducer.isError ? this.showError() : null}

                {/* Register */}
                <div className="row">
                  <div className="col-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.target.disabled = true;
                        this.props.register(this.props.history, this.state);
                        setTimeout(() => {
                          if (this.props.registerReducer.isError) {
                            const { errorMessage } = this.props.registerReducer;
                            MySwal.fire({
                              icon: "error",
                              title: "Oops... Register error!",
                              text: "" + errorMessage,
                              footer: "<a href>Why do I have this issue?</a>",
                            });
                          }
                        }, 100);
                      }}
                      type="submit"
                      className="btn btn-block btn-primary"
                    >
                      Register
                    </button>
                  </div>

                  {/* back */}
                  <div className="col-12">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.history.goBack();
                      }}
                      type="submit"
                      className="btn btn-block btn-default"
                      style={{ marginTop: 6 }}
                    >
                      Back
                    </button>
                  </div>
                  {/* <span>
                    {JSON.stringify(this.state)}
                  </span> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  registerReducer: state.registerReducer,
  divcodeReducer: state.divcodeReducer,
});

const mapDispatchToProps = {
  register,
  getDivCode,
};

//export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
