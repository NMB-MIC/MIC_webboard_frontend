import React, { Component } from "react";

import { connect } from "react-redux";
import { key } from "../../../constants/index";
import * as actions from "./../../../actions/division_code.action";
import { APP_TITLE } from "./../../../constants/index";
import Swal from "sweetalert2";


class CreateDivisionCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      divisionCode: "",
      divisionName: "",
      PlantCode: "",
      updateBy: localStorage.getItem(key.USER_EMP),
    };
  }

  componentDidMount() {
    document.title = APP_TITLE + " create division-code";
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Create division code Form</h1>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Create new division code master</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form role="form">
              <div className="card-body">
                <div className="form-group">
                  <label>Division code :</label>
                  <input
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
                  <label>Division Name :</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ divisionName: e.target.value });
                    }}
                    className="form-control"
                    id="divisionName"
                    name="divisionName"
                    placeholder="Fill division name"
                  />
                </div>

                <div className="form-group">
                  <label>Plant Code :</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      this.setState({ PlantCode: e.target.value });
                    }}
                    className="form-control"
                    id="PlantCode"
                    name="PlantCode"
                    placeholder="Fill plant dode"
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
                    this.props.createDivCode(this.props.history, this.state);
                    setTimeout(() => {
                      if (this.props.divcodeReducer.isError) {
                        const { errorMessage } = this.props.divcodeReducer;
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
  divcodeReducer: state.divcodeReducer,
});

const mapDispatchToProps = {
  ...actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDivisionCode);
