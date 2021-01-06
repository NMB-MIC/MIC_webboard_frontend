import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { httpClient } from "./../../../utils/HttpClient";
import { server } from "./../../../constants/index";
import Moment from "react-moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const getDate = (relative = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + relative);
  return date;
};

class EmpTrackBus extends Component {
  componentDidMount() {}

  constructor(props) {
    super(props);

    this.state = {
      startDate: getDate(0),
      toDate: getDate(1),
      empNumber: null,
      busZone: "All",
      data: null,
    };
  }

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleChangeToDate = (date) => {
    this.setState({
      toDate: date,
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

  getEmpTrackBus = async () => {
    if (this.state.empNumber === null || this.state.empNumber.length < 4) {
      MySwal.fire({
        icon: "warning",
        title: "Oops... Emp not found!",
        text: "Please fill Emp number ",
        footer: "<a href>Why do I have this issue?</a>",
      });

      return;
    }

    let resultBackend = await httpClient.get(
      server.EMP_TRACK_BUS_URL +
        "/" +
        this.state.empNumber +
        "&" +
        this.formatDate(this.state.startDate) +
        "&" +
        this.formatDate(this.state.toDate) +
        "&" +
        this.state.busZone
    );
    this.setState({ data: resultBackend });
    if (resultBackend.data.result.length <= 0) {
      MySwal.fire({
        icon: "warning",
        title: "Oops... Data not found!",
        text:
          "this Emp : " +
          this.state.empNumber +
          " not found on " +
          this.formatDate(this.state.startDate) +
          " to " +
          this.formatDate(this.state.toDate),
        footer: "<a href>Why do I have this issue?</a>",
      });
    }
  };

  renderTrackBusResult = () => {
    if (this.state.data !== null) {
      // return JSON.stringify(this.state.data.data.result)
      const myResult = this.state.data.data.result;
      return myResult.map((item) => (
        <tr key={item.id} role="row" className="odd">
          <td>
            <Moment format="DD-MMM-YYYY">{item.Update}</Moment>
          </td>
          <td>{item.EmpNo}</td>
          <td>{item.Getdata}</td>
          <td>{item.Bus_Zone}</td>
          <td>{item.Bus_Company}</td>
          <td>{item.Province}</td>
          <td>{item.Plate}</td>
          <td>{item.Seat_number}</td>
          <td>
            <button
              onClick={() =>
                this.props.history.push(
                  `/track_PlateBus/${item.Plate}&${item.Update}`
                )
              }
              type="button"
              className="btn btn-warning"
            >
              TrackPlate
            </button>
          </td>
        </tr>
      ));
    }
  };

  busListReander = () => {};

  render() {
    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Emp Tracking bus</h1>
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
              <div className="card-header border-0">
                <div className="d-flex justify-content-between">
                  {/* <h3 className="card-title">Select to tracking</h3> */}
                </div>
              </div>
              <div className="card-body">
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
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-user" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Bus :</label>
                  <div className="input-group">
                    <select
                      class="form-control"
                      onChange={(e) => {
                        this.setState({ busZone: e.target.value });
                      }}
                      name="divisionCode"
                      type="text"
                      className="form-control"
                    >
                      <option value="All">--All--</option>
                      <option value="B">Ayutthaya Zone</option>
                      <option value="L">Lopburi Zone</option>
                      {this.busListReander()}
                    </select>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-bus" />
                      </div>
                    </div>
                  </div>
                </div>

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

                <div className="form-group">
                  <label>to date :</label>
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
              <div className="card-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    this.getEmpTrackBus();
                  }}
                >
                  Track
                </button>
                <button
                  type="reset"
                  class="btn btn-default float-right"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.history.goBack();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card" style={{ margin: 10 }}>
          <div className="card-body table-responsive p-0">
            <table
              id="example2"
              className="table table-hover text-nowrap"
              role="grid"
              aria-describedby="example2_info"
            >
              <thead>
                <tr role="row">
                  <th
                    className="sorting_asc"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-sort="ascending"
                    aria-label="Rendering engine: activate to sort column descending"
                  >
                    Update
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Browser: activate to sort column ascending"
                  >
                    EmpNo
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Platform(s): activate to sort column ascending"
                  >
                    raw_data
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Platform(s): activate to sort column ascending"
                  >
                    Bus_Zone
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="Engine version: activate to sort column ascending"
                  >
                    Bus_Company
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="CSS grade: activate to sort column ascending"
                  >
                    Province
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="CSS grade: activate to sort column ascending"
                  >
                    Plate
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="CSS grade: activate to sort column ascending"
                  >
                    Seat_number
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="example2"
                    rowSpan={1}
                    colSpan={1}
                    aria-label="CSS grade: activate to sort column ascending"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderTrackBusResult()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default EmpTrackBus;
