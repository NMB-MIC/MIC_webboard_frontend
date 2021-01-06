import React, { Component } from "react";
import Table from "./../../../utils/dynamicTable";
import { httpClient } from "./../../../utils/HttpClient";
import { server } from "./../../../constants/index";
import * as moment from "moment";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const ReactSwal = withReactContent(Swal);

const getDate = (relative = 0) => {
  let date = new Date();
  date.setDate(date.getDate() + relative);
  return date;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      //Filter
      startDate: getDate(-30),
      toDate: getDate(1),
      plantCode: null,
      SelectPlant: "All",
      //for chart js
      reportType: "Summary",
      labels: [],
      subLabelNames: [],
      DataForChartJs: {},
    };
  }

  componentDidMount() {
    this.getData();
    this.getPlantCode();
  }

  loadingScreen() {
    if (this.state.data === null) {
      return (
        <div className="overlay">
          <i className="fas fa-3x fa-sync-alt fa-spin" />
          <div className="text-bold pt-2">Loading...</div>
        </div>
      );
    }
  }

  handleChangeStartDate = async (date) => {
    await this.setState({
      startDate: date,
    });
    this.getData();
  };

  handleChangeToDate = async (date) => {
    await this.setState({
      toDate: date,
    });
    this.getData();
  };

  getData = async (reportType) => {
    if (reportType != null) {
      await this.setState({ reportType });
    }

    let resultBackend;
    switch (this.state.reportType) {
      case "Plant":
        resultBackend = await httpClient.post(
          server.PERCENT_REGISTER_PLANT_URL,
          {
            startDate: this.state.startDate,
            toDate: this.state.toDate,
          }
        );
        break;

      case "Division":
        resultBackend = await httpClient.post(
          server.PERCENT_REGISTER_DIVISION_URL,
          {
            plantCode: this.state.SelectPlant,
          }
        );
        break;

      default:
        resultBackend = await httpClient.post(server.WEB_REGISTER_URL, {
          startDate: this.state.startDate,
          toDate: this.state.toDate,
        });
        break;
    }

    if (resultBackend.data.result !== null && resultBackend.data.result.length > 0) {
      this.setState({ data: resultBackend });
      let myResult = resultBackend.data.result;

      //get all object key
      let subLabelNames = Object.getOwnPropertyNames(
        resultBackend.data.result[0]
      );
      this.setState({ subLabelNames: subLabelNames });

      let labels = [];
      let DataForChartJs = {};
      let objectvalue = [];

      //Set label date format
      myResult.map((item) => {
        if (this.state.reportType === "Division") {
          labels.push(item[subLabelNames[0]]);
        } else {
          labels.push(moment.utc(item[subLabelNames[0]]).format("DD-MMM-YYYY"));
        }
      });
      this.setState({ labels });

      //convert data for chart js
      subLabelNames.map((subItem) => {
        myResult.map((item) => {
          objectvalue.push(item[subItem]);
        });
        Object.assign(DataForChartJs, { [subItem]: objectvalue });
        objectvalue = [];
      });
      this.setState({ DataForChartJs: DataForChartJs });

      // alert error msg
      if (resultBackend.data.result.length <= 0) {
        ReactSwal.fire({
          icon: "warning",
          title: "Oops... Data not found!",
          text:
            "Oops... Data not found! can not get data please contact web admin",
          footer: "<a href>Why do I have this issue?</a>",
        });
      }
    } else {
      ReactSwal.fire({
        icon: "warning",
        title: "Oops... Data not found!",
        text:
          "Oops... Data not found! can not get data please contact web admin",
        footer: "<a href>Why do I have this issue?</a>",
      });
    } 
  };

  renderTable = () => {
    if (this.state.data != null) {
      return (
        <Table
          headers={this.state.subLabelNames}
          rows={this.state.data.data.result}
        />
      );
    }
  };

  getPlantCode = async () => {
    let result = await httpClient.post(server.GROUP_PLANT_URL);
    this.setState({ plantCode: result.data.result });
  };

  plantCodeReander = () => {
    try {
      const myResult = this.state.plantCode;
      return myResult.map((item) => (
        <option value={item.PlantCode}>{item.PlantCode}</option>
      ));
    } catch (error) {}
  };

  renderSelection = () => {
    if (this.state.reportType === "Division") {
      return (
        <div className="row">
          <div className="col-md-6"></div>
          <label>Plant Code :</label>
          <select
            class="form-control"
            onChange={async (e) => {
              e.preventDefault();
              await this.setState({ SelectPlant: e.target.value });
              this.getData();
            }}
            name="divisionCode"
            type="text"
            className="form-control"
          >
            <option value="All">--All--</option>
            {this.plantCodeReander()}
          </select>
          <div className="col-md-6"></div>
        </div>
      );
    } else {
      return (
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
        </div>
      );
    }
  };

  render() {
    const startSubIndex = 1;
    function random_rgba() {
      var o = Math.round,
        r = Math.random,
        s = 255;
      return (
        "rgba(" +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        o(r() * s) +
        "," +
        "1" +
        ")"
      );
    }

    let data = { labels: this.state.labels, datasets: [] };
    var colorSet = [];
    colorSet.push(
      "rgb(255,0,0,1)",
      "rgb(0,255,0,1)",
      "rgb(0,0,255,1)",
      "rgb(255,255,0,1)",
      "rgb(0,255,255,1)",
      "rgb(255,0,255,1)",
      "rgb(255,0,120,1)",
      "rgb(255,125,0,1)",
      "rgb(0,125,255,1)"
    );

    if (colorSet.length < this.state.subLabelNames.length - 1) {
      for (let i = colorSet.length; i < this.state.subLabelNames.length; i++) {
        colorSet.push(random_rgba());
      }
    }

    // chart Data
    for (
      let index = 0 + startSubIndex;
      index < this.state.subLabelNames.length;
      index++
    ) {
      switch (this.state.reportType) {
        case "Division":
          if (this.state.subLabelNames[index] == "Percentage") {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: false,
              lineTension: 0.1,
              order: 0,
              type: "line",
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
              yAxisID: "Percentage",
            });
          } else {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: true,
              order: 0,
              lineTension: 0,
              type: "bar",
              backgroundColor: colorSet[index - startSubIndex],
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
            });
          }
          break;

        case "Plant":
          if (this.state.subLabelNames[index] == "Total") {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: true,
              lineTension: 0.1,
              backgroundColor: "rgb(0,0,0,0.5)",
              order: 0,
              type: "bar",
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
            });
          } else {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: false,
              order: 0,
              lineTension: 0,
              type: "line",
              // backgroundColor: "rgba(255,255,255,0)",
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
            });
          }

          break;

        default:
          if (this.state.subLabelNames[index] == "Registers") {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: true,
              type: "line",
              order: 0,
              lineTension: 0,
              backgroundColor: "rgba(255,255,255,0)",
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
              yAxisID: "Registers",
            });
          } else {
            data.datasets.push({
              label: this.state.subLabelNames[index],
              fill: true,
              lineTension: 0.1,
              backgroundColor: colorSet[index - startSubIndex],
              borderColor: colorSet[index - startSubIndex],
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(0,0,0,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(0,255,0,1)",
              pointHoverBorderColor: "rgba(0,0,0,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.state.DataForChartJs[this.state.subLabelNames[index]],
            });
          }
          break;
      }
    }

    // chart option
    let chartOption;
    switch (this.state.reportType) {
      case "Summary":
        chartOption = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                stacked: true,
                ticks: {
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return value
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  },
                },
              },
              {
                id: "Registers",
                position: "right",
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                stacked: true,
                ticks: {
                  autoSkip: false,
                  fontColor: "black",
                },
              },
            ],
          },
        };
        break;

      case "Division":
        chartOption = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                stacked: false,
                ticks: {
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return value
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  },
                },
              },
              {
                id: "Percentage",
                position: "right",
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                stacked: false,
                ticks: {
                  autoSkip: false,
                  fontColor: "black",
                },
              },
            ],
          },
        };
        break;

      default:
        chartOption = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                stacked: false,
                ticks: {
                  beginAtZero: true,
                  callback: function (value, index, values) {
                    return value
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  },
                },
              },
            ],
            xAxes: [
              {
                stacked: false,
                ticks: {
                  autoSkip: false,
                  fontColor: "black",
                },
              },
            ],
          },
        };
        break;
    }

    return (
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Report web register</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12">
          <div className="card card-primary card-tabs">
            <div className="card-header p-0 pt-1"></div>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input
                  type="radio"
                  name="optionsSummary"
                  id="optionsSummary"
                  autoComplete="off"
                  defaultChecked
                  onClick={(e) => {
                    e.preventDefault();
                    this.getData("Summary");
                  }}
                />
                Summary
              </label>
              <label className="btn btn-primary">
                <input
                  type="radio"
                  name="optionsBus"
                  id="optionsBus"
                  autoComplete="off"
                  onClick={(e) => {
                    e.preventDefault();
                    this.getData("Plant");
                  }}
                />
                Plant
              </label>
              <label className="btn btn-primary">
                <input
                  type="radio"
                  name="optionsBreak"
                  id="optionsBreak"
                  autoComplete="off"
                  onClick={(e) => {
                    e.preventDefault();
                    this.getData("Division");
                  }}
                />
                Division
              </label>
            </div>

            <div className="card-body">
              <div
                className="tab-pane fade active show"
                id="custom-tabs-one-Summary"
                role="tabpanel"
                aria-labelledby="custom-tabs-one-Summary-tab"
              >
                <div className="overlay-wrapper">
                  {this.loadingScreen()}
                  {/* Chart */}
                  <section className="content-header">
                    <h1>
                      Chart
                      <small> web register</small>
                    </h1>
                    <hr></hr>
                    {this.renderSelection()}

                    <div style={{ height: 500 }}>
                      <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={chartOption}
                      />
                    </div>
                  </section>
                </div>
                {/* Table */}
                <div className="card" style={{ margin: 0 }}>
                  <div
                    className="card-body table-responsive p-0"
                    style={{ maxHeight: 300 }}
                  >
                    {this.renderTable()}
                  </div>
                </div>
              </div>
            </div>
            {/* /.card */}
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
