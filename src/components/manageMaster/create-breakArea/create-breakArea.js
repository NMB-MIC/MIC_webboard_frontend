import React, { Component } from "react";

import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/break_area.action";
import { APP_TITLE } from "./../../../constants/index";
import Swal from "sweetalert2";

class CreateBreakArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      break_area_code: "",
      break_area_name: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create BreakArea-code";
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create break area code Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new break area master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>break area code :</label>
                  <input
                    autoFocus
                    type="text"
                    maxLength="4"
                    onChange={(e) => {
                      this.setState({ break_area_code: e.target.value });
                    }}
                    className="form-control"
                    id="BreakAreaCode"
                    name="BreakAreaCode"
                    placeholder="Fill Break Area code"
                  />
                </div>

                <div className="form-group">
                  <label>break area name :</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ break_area_name: e.target.value });
                    }}
                    className="form-control"
                    id="BreakAreaName"
                    name="BreakAreaName"
                    placeholder="Fill Break Area name"
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
                    this.props.createBreakArea(this.props.history, this.state);
                    setTimeout(() => {
                      if (this.props.breakAreaReducer.isError) {
                        const { errorMessage } = this.props.breakAreaReducer;
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
  breakAreaReducer: state.breakAreaReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBreakArea);
