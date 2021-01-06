import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { httpClient } from "./../../../utils/HttpClient";
import { OK, server } from "./../../../constants/index";
import Swal from "sweetalert2";
import { Scrollbars } from "react-custom-scrollbars";
import * as moment from "moment";
import Moment from "react-moment";
import { JsonToExcel } from "react-json-excel";

class TrackInfected extends Component {
  getDate = (relative = 0) => {
    let date = new Date();
    date.setDate(date.getDate() + relative);
    return date;
  };

  constructor(props) {
    super(props);

    this.state = {
      empNumber: null,
      infectedDate: this.getDate(0),
      previousDay: 14,
      riskTimeMin: 1,
      riskTimeMax: 1,
      data: null,
    };
  }

  handleChangeinfectedDate = (date) => {
    this.setState({
      infectedDate: date,
    });
  };

  formatDate = (date) => {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() > 8
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)) +
      "-" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate())
    );
  };

  tracking = async () => {
    try {
      await this.setState({ data: null });
      if (this.state.empNumber === null || this.state.empNumber === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please input infected employee number",
        });
        return;
      }
      let data = await httpClient.get(
        `http://54.255.187.109:2009/api/v1/qr_covid19/trackBreak/empNo=${this.state.empNumber
        }&alertDate=${moment(this.state.infectedDate).format(
          "YYYY-MM-DD"
        )}&previousDay=${this.state.previousDay}&riskTimeMin=${this.state.riskTimeMin
        }&riskTimeMax=${this.state.riskTimeMax}`
      );
      if (data.data.message === OK) {
        await this.setState({ data: data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderRiskEmployee() {
    if (this.state.data !== null && this.state.data.riskResult.length > 0) {
      const renderTableDataRiskEmployee = (myitem) => {
        let objectKey = Object.keys(this.state.data.riskResult[0])
        objectKey.splice(0, 1) // remove array index 0
        return objectKey.map((key) => (
          <td>{myitem[key]}</td>
        ))
      }

      return this.state.data.riskResult.map((item) => (
        <tr key={item.id} role="row" className="odd">
          <td>
            {moment(item.Update).utc().format("ddd DD-MMM-YYYY HH:mm:ss")}
          </td>
          {renderTableDataRiskEmployee(item)}
        </tr>
      ));
    }
  }

  renderInfectedEmployee() {
    if (this.state.data !== null && this.state.data.infectedResult.length > 0) {
      const renderTableDataInfectedEmployee = (myitem) => {
        let objectKey = Object.keys(this.state.data.infectedResult[0])
        objectKey.splice(0, 1) // remove array index 0
        return objectKey.map((key) => (
          <td>{myitem[key]}</td>
        ))
      }

      return this.state.data.infectedResult.map((item) => (
        <tr key={item.id} role="row" className="odd">
          <td>
            {moment(item.Update).utc().format("ddd DD-MMM-YYYY HH:mm:ss")}
          </td>
          {renderTableDataInfectedEmployee(item)}
        </tr>
      ));
    }
  }

  renderDownloadExcelInfectEmployees() {
    if (this.state.data !== null) {
      if (this.state.data.infectedResult.length > 0) {
        let objectKey = Object.keys(this.state.data.infectedResult[0])
        let fields = {}
        objectKey.forEach(key => {
          fields[key] = key
        });
        return (
          <div>
            <JsonToExcel
              data={this.state.data.infectedResult}
              filename={"infectedEmployee"}
              fields={fields}
              className={"btn btn-default"}
              text={"Download"}
            />
          </div>
        );
      }

    }
  }

  renderDownloadExcelRiskEmployees() {
    if (this.state.data !== null) {
      if (this.state.data.riskResult.length > 0) {
        let objectKey = Object.keys(this.state.data.riskResult[0])
        let fields = {}
        objectKey.forEach(key => {
          fields[key] = key
        });
        return (
          <JsonToExcel
            data={this.state.data.riskResult}
            filename={"RiskEmployees"}
            fields={fields}
            className={"btn btn-default"}
            text={"Download"}
          />
        );
      }

    }
  }

  convertDate(arrayData) {
    arrayData.forEach((item) => {
      item.Update = moment(item.Update).utc().format();
    });
  }

  renderTableHeaderRiskResult() {
    if (this.state.data !== null && this.state.data.riskResult.length > 0) {
      let objectKey = Object.keys(this.state.data.riskResult[0])
      return objectKey.map((item) => (
        <th style={{ zIndex: 0 }}>{item}</th>
      ))
    }
  }

  renderTableHeaderInfectEmployees() {
    if (this.state.data !== null && this.state.data.infectedResult.length > 0) {
      let objectKey = Object.keys(this.state.data.infectedResult[0])
      return objectKey.map((item) => (
        <th style={{ zIndex: 0 }}>{item}</th>
      ))
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        {" "}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Track infected</h1>
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
                  <h3 className="card-title">Select to tracking</h3>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Retrospect check (days) :</label>
                      <div className="input-group">
                        <input
                          ref={this.empInputBox}
                          min="1"
                          max="100"
                          onChange={(e) => {
                            this.setState({ previousDay: e.target.value });
                          }}
                          value={this.state.previousDay}
                          type="number"
                          className="form-control"
                          placeholder="เช็คย้อนหลัง จำนวนวัน"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="far fa-calendar-alt" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Check time range min (hours) :</label>
                      <div className="input-group">
                        <input
                          ref={this.empInputBox}
                          min="1"
                          max="24"
                          value={this.state.riskTimeMin}
                          onChange={(e) => {
                            this.setState({ riskTimeMin: e.target.value });
                          }}
                          type="number"
                          className="form-control"
                          placeholder="Check time range min"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="far fa-clock" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label>Check time range max (hours) :</label>
                      <div className="input-group">
                        <input
                          ref={this.empInputBox}
                          min="1"
                          max="24"
                          value={this.state.riskTimeMax}
                          onChange={(e) => {
                            this.setState({ riskTimeMax: e.target.value });
                          }}
                          type="number"
                          className="form-control"
                          placeholder="Check time range max"
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="far fa-clock" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Emp number :</label>
                      <div className="input-group">
                        <input
                          ref={this.empInputBox}
                          maxlength="6"
                          onChange={(e) => {
                            this.setState({ empNumber: e.target.value });
                          }}
                          autocomplete="on"
                          name="empNumber"
                          type="text"
                          className="form-control"
                          placeholder="Employee Number"
                          autoFocus
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <span className="fas fa-user" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>infected date :</label>
                      <div className="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <DatePicker
                          selected={this.state.infectedDate}
                          onSelect={this.handleChangeinfectedDate}
                          onChange={this.handleChangeinfectedDate}
                          dateFormat="dd-MMM-y"
                          className="form-control"
                        />
                        <button
                          style={{ marginLeft: 10 }}
                          className="btn btn-primary float-right"
                          onClick={(e) => {
                            e.preventDefault();
                            this.tracking();
                          }}
                        >
                          Tracking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card-warning">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Risk Employee result</h3>
                  {this.renderDownloadExcelRiskEmployees()}
                </div>
              </div>
              <div className="card-body">
                <div
                  className="card-body table-responsive p-0"
                  style={{ maxHeight: 400 }}
                >
                  <Scrollbars
                    onScroll={this.handleScroll}
                    onScrollFrame={this.handleScrollFrame}
                    onScrollStart={this.handleScrollStart}
                    onScrollStop={this.handleScrollStop}
                    onUpdate={this.handleUpdate}
                    renderView={this.renderView}
                    renderTrackHorizontal={this.renderTrackHorizontal}
                    renderTrackVertical={this.renderTrackVertical}
                    renderThumbHorizontal={this.renderThumbHorizontal}
                    renderThumbVertical={this.renderThumbVertical}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={400}
                    thumbMinSize={50}
                    universal={true}
                  >
                    <table
                      id="DivTable"
                      className="table table-head-fixed table-hover text-nowrap"
                      role="grid"
                      style={{ zIndex: 0 }}
                    >
                      <thead style={{ zIndex: 0 }}>
                        <tr role="row" style={{ zIndex: 0 }}>
                          {this.renderTableHeaderRiskResult()}
                        </tr>
                      </thead>
                      <tbody>{this.renderRiskEmployee()}</tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
            <div className="card card-danger">
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">Infected Employee result</h3>
                  {this.renderDownloadExcelInfectEmployees()}
                </div>
              </div>
              <div className="card-body">
                <div
                  className="card-body table-responsive p-0"
                  style={{ maxHeight: 400 }}
                >
                  <Scrollbars
                    onScroll={this.handleScroll}
                    onScrollFrame={this.handleScrollFrame}
                    onScrollStart={this.handleScrollStart}
                    onScrollStop={this.handleScrollStop}
                    onUpdate={this.handleUpdate}
                    renderView={this.renderView}
                    renderTrackHorizontal={this.renderTrackHorizontal}
                    renderTrackVertical={this.renderTrackVertical}
                    renderThumbHorizontal={this.renderThumbHorizontal}
                    renderThumbVertical={this.renderThumbVertical}
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={400}
                    thumbMinSize={50}
                    universal={true}
                  >
                    <table
                      id="DivTable"
                      className="table table-head-fixed table-hover text-nowrap"
                      role="grid"
                      style={{ zIndex: 0 }}
                    >
                      <thead style={{ zIndex: 0 }}>
                        <tr role="row" style={{ zIndex: 0 }}>
                          {this.renderTableHeaderInfectEmployees()}
                        </tr>
                      </thead>
                      <tbody>{this.renderInfectedEmployee()}</tbody>
                    </table>
                  </Scrollbars>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackInfected;
