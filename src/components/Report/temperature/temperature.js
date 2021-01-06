import React, { Component } from "react";
// import Table from "./../../../utils/dynamicTable";
import { httpClient } from "./../../../utils/HttpClient";
import { server, apiUrl } from "./../../../constants/index";
import DatePicker from "react-datepicker";
import { getDivCode } from "./../../../actions/division_code.action";
import { connect } from "react-redux";
// import CsvDownload from "react-json-to-csv";
// import fileDownload from "js-file-download";
import join from "url-join";

function getDate(relative = 0) {
  let date = new Date();
  date.setDate(date.getDate() + relative);
  return date;
}

function formatDate(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "-" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
  );
}

class Temperature extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //Data
      reportType: "Total",
      //Filter
      startDate: getDate(0),
      toDate: getDate(0),
      empNumber: "All",
      divisionCode: "All",
    };
  }

  handleChangeStartDate = async (date) => {
    await this.setState({
      startDate: date,
    });
  };

  handleChangeToDate = async (date) => {
    await this.setState({
      toDate: date,
    });
  };

  componentDidMount = async () => {
    this.props.getDivCode();
  };

  getdata = async () => {
    const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
    var configUrl = "";

    let result = null;

    switch (this.state.reportType) {
      case "Total":
        configUrl =
          server.BODY_TEMP_EX_URL +
          "/" +
          this.state.empNumber +
          "/" +
          this.state.divisionCode +
          "/" +
          formatDate(this.state.startDate) +
          "/" +
          formatDate(this.state.toDate) +
          "/";

        break;

      case "Missing":
        configUrl =
          server.BODY_TEMP_MISSING_EX_URL +
          "/" +
          this.state.divisionCode +
          "/" +
          formatDate(this.state.startDate) +
          "/" +
          formatDate(this.state.toDate) +
          "/";

        break;

      case "Over":
        configUrl =
          server.BODY_TEMP_OVER_EX_URL +
          "/" +
          this.state.divisionCode +
          "/" +
          formatDate(this.state.startDate) +
          "/" +
          formatDate(this.state.toDate) +
          "/";
        break;

      default:
        break;
    }

    if (!isAbsoluteURLRegex.test(configUrl)) {
      configUrl = join(apiUrl, configUrl);
    }

    window.open(configUrl);
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
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Report Temperature</h1>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        <div className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    {/* input */}
                    <div className="form-group">
                      <label>Start date :</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i
                              className="far fa-calendar-alt"
                              style={{ marginRight: 5 }}
                            />
                            <DatePicker
                              selected={this.state.startDate}
                              onSelect={this.handleChangeStartDate}
                              onChange={this.handleChangeStartDate}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>To date :</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i
                              className="far fa-calendar-alt"
                              style={{ marginRight: 5 }}
                            />
                            <DatePicker
                              selected={this.state.toDate}
                              onSelect={this.handleChangeToDate}
                              onChange={this.handleChangeToDate}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <label>Division Code :</label>
                      <select
                        class="form-control"
                        onChange={async (e) => {
                          e.preventDefault();
                          await this.setState({ divisionCode: e.target.value });
                        }}
                        name="divisionCode"
                        type="text"
                        className="form-control"
                      >
                        <option value="All">--All--</option>
                        {this.divisionCodeReander()}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="form-group">
                      <label>Report type :</label>
                      <select
                        class="form-control"
                        onChange={async (e) => {
                          e.preventDefault();
                          await this.setState({ reportType: e.target.value });
                        }}
                        name="divisionCode"
                        type="text"
                        className="form-control"
                      >
                        <option value="Total">--Temperature record--</option>
                        <option value="Missing">--Missing record--</option>
                        <option value="Over">--Over temperature--</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div class="form-group">
                      <label>Download Excel :</label>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          this.getdata();
                        }}
                        className="btn btn-block btn-success"
                      >
                        <span
                          className="iconify"
                          data-icon="foundation:page-export-csv"
                          data-inline="true"
                          style={{ marginRight: 5 }}
                        ></span>
                        Download
                      </button>
                    </div>
                    <div class="form-group">
                      <label>Download Excel All manpower:</label>
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          const isAbsoluteURLRegex = /^(?:\w+:)\/\//;
                          let configUrl = server.ALL_MANPOWER_URL;
                          if (!isAbsoluteURLRegex.test(configUrl)) {
                            configUrl = join(apiUrl, configUrl);
                          }
                          window.open(configUrl);
                        }}
                        className="btn btn-block btn-success"
                      >
                        <span
                          className="iconify"
                          data-icon="foundation:page-export-csv"
                          data-inline="true"
                          style={{ marginRight: 5 }}
                        ></span>
                        All manpower
                      </button>
                    </div>
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

const mapStateToProps = (state) => ({
  divcodeReducer: state.divcodeReducer,
});

const mapDispatchToProps = {
  getDivCode,
};

//export default Register;
export default connect(mapStateToProps, mapDispatchToProps)(Temperature);
