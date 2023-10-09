import React, { Component } from "react";
//import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { httpClient } from "../../utils/HttpClient";
import { server, key } from "../../constants";
import Select from "react-select";
//import { Multiselect } from "multiselect-react-dropdown";
import moment from "moment";
//import { Line, Bar, Pie } from "react-chartjs-2";
import Swal from "sweetalert2";

window.Swal = Swal;

class XbarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_date: moment().format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      listModel: [],
      listLine: [],
      listPart: [],
      listPara: [],

      selectModel: [],
      selectLine: [],
      selectPart: [],
      selectPara: [],

      //for graph

      xAxis: [],
      allData: [],

      hidediv: false,
    };

    // design button
    this.style1 = {
      background: "blue",
      color: "white",
      fontSize: "25px",
      textAlign: "center",
      borderRadius: "5px",
      height: 47,
      marginLeft: "auto",
      display: "flex",
      width: "100px",
      justifyContent: "center",
    };

    this.style2 = {
      background: "'transparent",
      color: "gray",
      fontSize: "25px",
      textAlign: "center",
      borderRadius: "5px",
      height: 47,
      marginLeft: "auto",
      display: "flex",
      width: "100px",
      justifyContent: "center",
    };
  }

  // Function part :

  getDataModel = async () => {
    try {
      const array = await httpClient.get(server.MasterModel_URL);
      // console.log(array.data.result);
      const options = array.data.result.map((d) => ({
        label: d.Model,
      }));
      this.setState({ listModel: options });
    } catch (error) {
      console.log(error);
    }
  };

  getDataLine = async () => {
    try {
      const array = await httpClient.get(server.MasterLine_URL);
      // console.log(array.data.result);
      const Line = array.data.result.map((d) => ({
        label: d.Line,
      }));
      this.setState({ listLine: Line });
    } catch (error) {
      console.log(error);
    }
  };

  getDataPart = async () => {
    try {
      const array = await httpClient.get(server.MasterPart_URL);
      // console.log(array.data.result);
      const Part = array.data.result.map((d) => ({
        label: d.Part,
      }));
      this.setState({ listPart: Part });
    } catch (error) {
      console.log(error);
    }
  };
  // Multipara
  getDataPara = async () => {
    try {
      let array = await httpClient.get(
        server.MasterPara_URL + "/" + this.state.selectPart
      );
      console.log(array.data.result);
      const Para = array.data.result.map((d) => ({
        label: d.Parameter,
      }));
      this.setState({ listPara: Para });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = async (event) => {
    try {
      const Newevent = Object.keys(event).map((key) => event[key].label);
      const json_string = JSON.stringify(Newevent);
      this.setState({ selectPara: json_string });

      console.log(Object.keys(event).map((key) => event[key].label));
    } catch (error) {
      console.log(error);
    }
  };

  refreshPage() {
    window.location.reload();
  }

  handleClick() {
    this.setState({
      hidediv: true,
    });
  }

  componentDidMount = async () => {
    await this.getDataModel();
    await this.getDataLine();
    await this.getDataPart();
   
  };

  getXbarData = async (event) => {
    try {
      let result = await httpClient.get(
        server.xbar_URL +
          "/" +
          this.state.start_date +
          "/" +
          this.state.end_date +
          "/" +
          this.state.selectModel +
          "/" +
          this.state.selectLine +
          "/" +
          this.state.selectPart +
          "/" +
          this.state.selectPara
      );

      console.log(result.data.seriesData);

      let allData = result.data.seriesData[0];
      let xAxis = result.data.seriesTimeset[0][0].data;

      this.setState({
        allData,
        xAxis,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log(this.state.allData);
    console.log(this.state.xAxis);

    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
      width: "10px",
      height: "200px",
    };

    return (
      <div className="content-wrapper">
        <div class="content-header">
          <div class="container-fluid">
            <div class="card card-primary">
              <div class="card-header"></div>
              <div class="row mb-2">
                <div class="card-body">
                  <div class="row">
                    <div class="col-2">
                      <h4>Start Date</h4>
                      <input
                        class="form-control is-valid"
                        type="date"
                        id="id_daydate"
                        name="name_daydate"
                        value={this.state.start_date}
                        onChange={async (e) => {
                          await this.setState({
                            // date_validate: "form-control is-valid",
                            start_date: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          });
                        }}
                      />
                    </div>
                    <div class="col-2">
                      <h4>End Date</h4>
                      <input
                        class="form-control is-valid"
                        type="date"
                        id="id_daydate"
                        name="name_daydate"
                        value={this.state.end_date}
                        onChange={async (e) => {
                          await this.setState({
                            // date_validate: "form-control is-valid",
                            end_date: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          });
                        }}
                      />
                    </div>
                    <div class="col-2">
                      <h4>Model</h4>
                      <Select
                        options={this.state.listModel}
                        onChange={async (e) => {
                          await this.setState({
                            selectModel: e.label,
                          });
                        }}
                      />
                    </div>
                    <div class="col-2">
                      <h4>Line</h4>
                      <Select
                        options={this.state.listLine}
                        onChange={async (e) => {
                          await this.setState({
                            selectLine: e.label,
                          });
                        }}
                      />
                    </div>
                    <div class="col-2">
                      <h4>Part</h4>
                      <Select
                        options={this.state.listPart}
                        onChange={async (e) => {
                          await this.setState({ selectPart: e.label });
                          await this.getDataPara();
                        }}
                      />
                    </div>
                    <div class="col-2">
                      <h4>Parameter</h4>

                      <Select
                        isMulti
                        options={this.state.listPara}
                        onChange={this.handleChange.bind(this)}
                        selectionLimit="1"
                        displayValue="label"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-11">
                    <button
                      style={this.style1}
                      onClick={async () => {
                        await this.getXbarData();
                        await this.handleClick();
                      }}
                    >
                      Check
                    </button>
                  </div>
                  <div class="col-1">
                    <button
                      style={this.style2}
                      onClick={async () => {
                        await this.refreshPage();
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Xbar chart area */}
        <div id="results" class="content" hidden={!this.state.hidediv}>
          <div class="container-fluid">
            <div class="card card-primary">
              <div class="card-body">
                <div class="row">
                  <h3 class="m-0 text-dark"> Xbar chart</h3>
                  <div class="card-body">
                    <div class="content">
                      <div class="row">
                        <div class="center">
                          {/* graph select1st */}

                          <Chart
                            hidden={this.state.selectPara == undefined}
                            options={{
                              chart: {
                                zoom: {
                                  enabled: true,
                                },
                              },
                              legend: {
                                position: "right",
                                fontSize: "14px",
                                offsetX: 0,
                                offsetY: 100,
                                horizontalAlign: "center",
                              },

                              type: "rangeBar",
                              id: "basic-bar",

                              colors: [
                                "#a9a9a9",
                                "#FF4560",
                                "#FF4560",
                                "#00E396",
                              ],
                              noData: {
                                style: { fontSize: "24px", color: "red" },
                                text: "No data...",
                              },

                              title: {
                                text: this.state.selectPara,
                                align: "center",
                                margin: 10,
                                offsetX: 0,
                                offsetY: 0,
                                floating: false,
                                style: {
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                  fontFamily: undefined,
                                  color: "#263238",
                                },
                              },

                              markers: {
                                size: [4, 1],
                              },

                              xaxis: {
                                categories: this.state.xAxis,
                              },
                            }}
                            series={this.state.allData}
                            type="line"
                            height={350}
                            width={1100}
                          />
                        </div>
                      </div>
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

export default XbarChart;
