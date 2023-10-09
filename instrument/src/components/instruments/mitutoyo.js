import React, { Component } from "react";
import { httpClient } from "../../utils/HttpClient";
import Swal from "sweetalert2";
import { server } from "../../constants/index";
import mqtt from "precompiled-mqtt";
//import moment from "moment";
import { MQTT_PATH } from "../../constants";

class Mitutoyo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measure_data1: "",
      measure_data2: "",
      measure_data3: "",

      //  start_date: moment().format("DD-MM-YYYY"),
    };
  }

  handleChange = () => {
    var getData1 = "";
    var getData2 = "";
    var getData3 = "";

    var client = mqtt.connect(MQTT_PATH.ADDRESS_1885);

    client.on("connect", () => {
      console.log("connected");
      client.subscribe("INST01/data1");
      client.subscribe("INST01/data2");
      client.subscribe("INST01/data3");
    });

    client.on("message", (topic, message) => {
      if (topic === "INST01/data1") {
        getData1 = message.toString();
        this.setState({ measure_data1: getData1 });
      } else if (topic === "INST01/data2") {
        getData2 = message.toString();
        this.setState({ measure_data2: getData2 });
      } else if (topic === "INST01/data3") {
        getData3 = message.toString();
        this.setState({ measure_data3: getData3 });
      }
    });
  };

  componentDidMount = async () => {
    await this.handleChange();
  };

  componentWillUnmount() {
    if (this.client) this.client.end();
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.doRecord();
    }
  };
  clearData() {
    this.setState({
      measure_data1: "",
      measure_data2: "",
      measure_data3: "",
    });
  }

  doRecord = async () => {

      if (
      this.state.measure_data1 !== null &&
      this.state.measure_data2 !== null &&
      this.state.measure_data3 !== null
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data not complete yet",
        text: "Plesase confirm your recording",
      });

      return;
    }
    let insert_result = await httpClient.post(server.INSERT_DATA_URL, this.state)
        if (insert_result.data.api_result === "OK") {
      await Swal.fire({
        icon: "success",
        title: "บันทึกเรียบร้อย",
        text: "Record OK !!!",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.replace("./mitutoyo");
    } else {
      await Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "Incomplete data",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.replace("./mitutoyo");
    }
  };

  // doRecord =  () => {
  //     Swal.fire({
  //       icon: "warning",
  //       title: "data not match",
  //       text: "Plesase confirm your data",
  //     });

  //     return;
  //   }

  render() {
    console.log(this.state.measure_data1);
    return (
      <div className="register-page" style={{ maxHeight: 790 }}>
        <div className="register-box">
          <div className="register-logo"></div>
          {/* /.register-logo */}
          <div className="card">
            <div className="card-body register-card-body">
              <p className="register-box-msg">Mesurement data</p>

              {/* xx */}
              <div className="input-group mb-3">
                <input
                  value={this.state.measure_data1}
                  type="text"
                  className="form-control"
                  placeholder="data1"
                  onChange={(e) => {
                    this.setState({
                      measure_data1: e.target.value,
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text"></div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.measure_data2}
                  type="text"
                  className="form-control"
                  placeholder="data2"
                  onChange={(e) => {
                    this.setState({
                      measure_data2: e.target.value,
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text"></div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  value={this.state.measure_data3}
                  type="text"
                  className="form-control"
                  placeholder="data3"
                  onChange={(e) => {
                    this.setState({
                      measure_data3: e.target.value,
                    });
                  }}
                />
                <div className="input-group-append">
                  <div className="input-group-text"></div>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.doRecord();
                    }}
                  >
                    Submit
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-danger btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      this.clearData();
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mitutoyo;
