import React, { Component } from "react";

import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/alert_mail.action";
import { APP_TITLE } from "./../../../constants/index";
import Swal from "sweetalert2";

class CreateAlertEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divisionCode: "",
      email: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create alert-email";
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create alert email Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new alert email master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Division code :</label>
                  <input
                    autoFocus
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      this.setState({ divisionCode: e.target.value });
                    }}
                    className="form-control"
                    id="divisionCode"
                    name="divisionCode"
                    placeholder="Fill division code"
                  />
                </div>

                <div className="form-group">
                  <label>email :</label>
                  <input
                    type="email"
                    onChange={(e) => {
                      this.setState({ email: e.target.value });
                    }}
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Fill email"
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
                    this.props.createAlertEmail(this.props.history, this.state);
                    setTimeout(() => {
                      if (this.props.alertMailReducer.isError) {
                        const { errorMessage } = this.props.alertMailReducer;
                        Swal.fire({
                          icon: "error",
                          title: "Oops... create error!",
                          text: "" + errorMessage,
                          footer: "<a href>Why do I have this issue?</a>",
                        });
                      }
                    }, 100);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  alertMailReducer: state.alertMailReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAlertEmail);