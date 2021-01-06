import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constants/index";
import * as moment from "moment";
import Table from "../../../utils/dynamicTable";

function setDate(relative) {
  let date = new Date();
  date.setDate(date.getDate() + relative);
  return date;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class TrackAreaBus extends Component {
  constructor(props) {
    super(props);
    this.empInputBox = React.createRef();

    this.state = {
      startDate: setDate(0),
      toDate: setDate(1),
      tableHeader: [],
      Plate: null,
      data: null,
    };
  }

  componentDidMount = async () => {
    let Plate = this.props.match.params.Plate;
    let Update = this.props.match.params.Update;
    await this.setState({
      Plate,
      startDate: addDays(Date.parse(Update), -14),
      toDate: addDays(Date.parse(Update), 14),
    });

    this.getdata();
  };

  getdata = async () => {
    let resultBackend = await httpClient.get(
      server.TRACK_BUS_PLATE_URL +
        "/" +
        this.state.Plate +
        "&" +
        this.formatDate(this.state.startDate) +
        "&" +
        this.formatDate(this.state.toDate)
    );

    let tableHeader = await Object.getOwnPropertyNames(
      resultBackend.data.result[0]
    );

    //set Date
    await resultBackend.data.result.map((item) => {
      item.Update = moment.utc(item.Update).format("DD-MMM-YYYY");
    });

    this.setState({ data: resultBackend.data, tableHeader });
  };

  renderTable = () => {
    if (this.state.data != null && this.state.tableHeader != null)
      return (
        <Table headers={this.state.tableHeader} rows={this.state.data.result} />
      );
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

  render() {
    return (
      <div className="content-wrapper">
        <div className="card" style={{ margin: 0 }}>
        <div className="card-header">
          
        </div>
          <div className="card-body">
            <div
              className="card-body table-responsive p-0"
              style={{ maxHeight: 400 }}
            >
              {this.renderTable()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackAreaBus;
