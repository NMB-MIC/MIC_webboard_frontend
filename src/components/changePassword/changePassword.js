import { connect } from "react-redux";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { key, server, OK } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import * as action from "../../actions/app.action";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem(key.USER_NAME),
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  doChangePassword = async () => {
    if (this.state.confirmPassword === this.state.newPassword) {
      let result = await httpClient.patch(server.USER_URL, this.state)
      if (result.data.api_result === OK) {
        Swal.fire({
          icon: 'success',
          title: 'Yeah...',
          text: 'Your password has been changed',
        }).then(() => {
          localStorage.removeItem(key.LOGIN_PASSED);
          localStorage.removeItem(key.API_KEY);
          localStorage.removeItem(key.USER_NAME);
          localStorage.removeItem(key.USER_LV);
          localStorage.removeItem(key.USER_EMP);
          localStorage.removeItem(key.TOKEN);
          this.props.history.push("/Login");
          this.props.appReducer.app.forceUpdate();
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: result.data.error,
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password not match!',
      })
    }
  }

  render() {
    return (
      <div class="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>
                  Change password{" "}
                  <span
                    className="iconify"
                    data-icon="vaadin:password"
                    data-inline="false"
                  />
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Change password form</h3>
              </div>
              {/* /.card-header */}
              {/* form start */}
              <form role="form">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Old password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Old password"
                      onChange={(e) => {
                        this.setState({ oldPassword: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) => {
                        this.setState({ newPassword: e.target.value });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm new password"
                      onChange={(e) => {
                        this.setState({ confirmPassword: e.target.value });
                      }}
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      this.doChangePassword()
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.history.goBack();
                    }}
                    className="btn btn-default float-right"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  appReducer: state.appReducer,
});

const mapDispatchToProps = {
  ...action,
};

// export default ChangePassword;
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
