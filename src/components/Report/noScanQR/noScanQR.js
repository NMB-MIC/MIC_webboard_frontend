import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { httpClient } from "./../../../utils/HttpClient";
import { apiUrl, OK, server } from "./../../../constants/index";
import Swal from "sweetalert2";
import { Scrollbars } from "react-custom-scrollbars";
import * as moment from "moment";
import join from "url-join";

class NoScanQR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StartDate: this.getDate(-1),
      toDate: this.getDate(0),
      data: null,
    };
  }

  getDate = (relative = 0) => {
    let date = new Date();
    date.setDate(date.getDate() + relative);
    return date;
  };

  handleChangeStartDate = (date) => {
    this.setState({
      StartDate: date,
    });
  };
  handleChangeToDate = (date) => {
    this.setState({
      toDate: date,
    });
  };

  downloadNoScanQR = async () => {
    try {
      // let result = await httpClient.get(
      //   server.NO_SCAN_REPORT_URL +
      //     `/${moment(this.state.StartDate).format("YYYY-MM-DD")}&${moment(
      //       this.state.toDate
      //     ).format("YYYY-MM-DD")}`
      // );
      window.open(
        join(
          apiUrl,
          server.NO_SCAN_REPORT_URL,
          `/${moment(this.state.StartDate).format("YYYY-MM-DD")}&${moment(
            this.state.toDate
          ).format("YYYY-MM-DD")}`
        ),
        "_blank"
      );
      // if (result.data.message === OK) {
      //   this.setState({ data: result.data.result });
      //   console.log(result.data.result);
      // }
    } catch (error) {}
  };

  render() {
    return (
      <div className="content-wrapper">
        {" "}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Track no scan QR Code</h1>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Select to filter</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Start date :</label>
                      <div className="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <DatePicker
                          selected={this.state.StartDate}
                          onSelect={this.handleChangeStartDate}
                          onChange={this.handleChangeStartDate}
                          dateFormat="dd-MMM-y"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>to date :</label>
                      <div className="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <DatePicker
                          selected={this.state.toDate}
                          onSelect={this.handleChangeToDate}
                          onChange={this.handleChangeToDate}
                          dateFormat="dd-MMM-y"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        this.downloadNoScanQR();
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NoScanQR;
