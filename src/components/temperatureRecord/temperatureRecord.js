import React, { Component } from "react";
import { key, YES, server, OK } from "./../../constants/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { httpClient } from "./../../utils/HttpClient";
import * as moment from "moment";

const ReactSwal = withReactContent(Swal);

class TemperatureRecord extends Component {
  constructor(props) {
    super(props);
    this.empNumberBox = React.createRef();
    this.temperatureBox = React.createRef();

    this.state = {
      empNumber: "",
      temperature: null,
    };
  }

  componentDidMount = async () => {
    this.isMember();
    await this.setEmpNumber();

    if (this.state.empNumber != "" && this.state.empNumber != null) {
      this.temperatureBox.current.focus();
    } else {
      this.empNumberBox.current.focus();
    }
    window.scrollTo(0, 0);
  };

  setEmpNumber = async () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      this.setState({ empNumber: localStorage.getItem(key.USER_EMP) });
    } else {
      this.setState({ empNumber: localStorage.getItem(key.TEMP_EMP) });
    }
  };

  recordTemp = async () => {
    // check error
    if (this.state.empNumber == null || this.state.empNumber == "") {
      ReactSwal.fire({
        title: "Oops...",
        html:
          "please enter your employee number <br> กรุณากรอกรหัสพนักงานด้วยค่ะ/ครับ",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    if (this.state.temperature == null) {
      ReactSwal.fire({
        title: "Oops...",
        html:
          "please enter your body temperature <br> กรุณากรอกอุณหภูมิร่างกายด้วยค่ะ/ครับ",
        icon: "error",
        timer: 2000,
      });
      return;
    }
    if (this.state.temperature > 42) {
      ReactSwal.fire({
        title: "Please check...",
        html:
          "Your temperature is over 42°C ?<br> อุณหภูมิใส่มากกว่า 42 องศาหรือเปล่า",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    if (this.state.temperature < 34) {
      ReactSwal.fire({
        title: "Please check...",
        html:
          "Your temperature is lower than 34°C ? <br> อุณหภูมิใส่ต่ำกว่า 34 องศาหรือเปล่า",
        icon: "error",
        timer: 3000,
      });
      return;
    }

    localStorage.setItem(key.TEMP_EMP, this.state.empNumber);

    //send data to backend
    let result = await httpClient.post(server.BODY_TEMP_URL, {
      EmpNo: this.state.empNumber,
      body_temperature: this.state.temperature,
    });

    //check record result
    if (result.data.message == OK) {
      if (this.state.temperature >= 37.5) {
        // this.say(
        //   this.state.empNumber +
        //     "Please inform your supervisor and see a doctor"
        // );
        ReactSwal.fire({
          title: this.state.empNumber + "Alert !!!",
          html:
            "<h4 style='color:blue;'>Your temperature is over 37.5°C !!!</h4>" +
            "<h4>อุณหภูมิของท่านเกิน 37.5°C !!!</h4>" +
            "<p style='color:blue;'>Please inform your supervisor and see a doctor !!!</p>" +
            "<p>ให้รีบแจ้งหัวหน้างานและรีบไปพบแพทย์ !!!</p>",
          icon: "warning",

          showCancelButton: false,

          confirmButtonText: "OK...",
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              title: this.state.empNumber,
              html:
                "<p style='color:blue;'>Already record your temperature(" +
                this.state.temperature +
                " °C)</p>" +
                "<p>บันทึกอุณหภูมิของคุณเรียบร้อยแล้ว(" +
                this.state.temperature +
                "°C)</p>" +
                "<p style='color:blue;'> record time : " +
                moment(Date.now()).format("DD-MMM-YYYY HH:mm:ss a") +
                "</p>" +
                "<p> เวลาที่บันทึก : " +
                moment(Date.now()).format("DD-MMM-YYYY HH:mm:ss a") +
                "</p>",
              icon: "info",
              footer:
                "<p>แคปรูปตรงนี้เก็บไว้เป็นหลักฐานได้ ,ถ้าบันทึกผิดให้บันทึกซ้ำอีกรอบ</p>",
            });
            // this.say(
            //   this.state.empNumber + " your body temperature record completed"
            // );
          }
        });
      } else {
        ReactSwal.fire({
          title: this.state.empNumber,
          html:
            "<h3>Thank you !</h3>" +
            "<p style='color:blue;'>Already record your temperature(" +
            this.state.temperature +
            " °C)</p>" +
            "<p>บันทึกอุณหภูมิของคุณเรียบร้อยแล้ว(" +
            this.state.temperature +
            "°C)</p>" +
            "<p style='color:blue;'> record time : " +
            moment(Date.now()).format("DD-MMM-YYYY HH:mm:ss a") +
            "</p>" +
            "<p> เวลาที่บันทึก : " +
            moment(Date.now()).format("DD-MMM-YYYY HH:mm:ss a") +
            "</p>",
          icon: "success",
          footer:
            "<p>แคปรูปตรงนี้เก็บไว้เป็นหลักฐานได้ ,ถ้าบันทึกผิดให้บันทึกซ้ำอีกรอบ</p>",
        });
        // this.say(
        //   this.state.empNumber + " your body temperature record completed"
        // );
      }
      this.props.history.push("/home");
    } else {
      ReactSwal.fire({
        title: "Oops...",
        text: "Data record error please try again or contact web admin",
        icon: "error",
        timer: 1500,
      });
    }

    return;
  };

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  say(m) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[1];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = "en-US";
    speechSynthesis.speak(msg);
  }

  render() {
    return (
      <div id="wrapper" className="content-wrapper">
        <div
          id="capture"
          className="login-page"
          style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", minHeight: 790 }}
        >
          <div
            className="login-box"
            style={{
              borderRadius: 8,
              backgroundColor: "whitesmoke",
              padding: 12,
            }}
          >
            <div className="login-logo">
              <img
                src="./images/NMB_logo.png"
                style={{ textAlign: "center", maxHeight: 70 }}
              />
              <b>Temperature </b>Record
            </div>
            {/* /.login-logo */}
            <div className="card">
              <div class="ribbon-wrapper">
                <div class="ribbon bg-primary">Thank</div>
              </div>
              <div className="card-body login-card-body">
                <p className="login-box-msg">Please record body temperature.</p>
                <p className="login-box-msg">
                  กรุณาบันทึกอุณหภูมิร่างกายด้วยค่ะ
                </p>
                <p className="login-box-msg">体温を記録してください。</p>
                <form>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Emp number , รหัสพนักงาน"
                      id="empNumber"
                      maxlength="5"
                      value={this.state.empNumber}
                      ref={this.empNumberBox}
                      onChange={(e) => {
                        var str = e.target.value.replace(/[^\w+$]/gi, "");
                        str = str.replace(/[$+_]/g, "");
                        this.setState({ empNumber: str });
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span
                          className="iconify"
                          data-icon="bi:people-fill"
                          data-inline="false"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      className="form-control"
                      // is-valid
                      placeholder="Body temp °C, อุณหภูมิร่างกาย °C"
                      step="0.1"
                      min="34"
                      max="42"
                      id="temperature"
                      ref={this.temperatureBox}
                      onChange={(e) => {
                        this.setState({ temperature: e.target.value });
                      }}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span
                          className="iconify"
                          data-icon="fa-solid:temperature-high"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={(e) => {
                          e.preventDefault();
                          e.target.disabled = true;
                          this.recordTemp();
                        }}
                      >
                        บันทึก/Record/記録
                      </button>
                    </div>
                    <hr></hr>
                    <div className="col-12" style={{ marginTop: 6 }}>
                      <button
                        type="submit"
                        className="btn btn-default btn-block"
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.setItem(key.TEMP_EMP, "");
                          this.props.history.go(0);
                        }}
                      >
                        รีเซ็ต/Reset/リセット
                      </button>
                    </div>
                    <div
                      className="col-12"
                      style={{ marginTop: 6, textAlign: "center" }}
                    >
                      <img
                        src="Images/Mask.PNG"
                        alt="..."
                        style={{ opacity: "0.8", maxWidth: "100%" }}
                      />
                    </div>
                    {/* <div
                      className="col-6"
                      style={{ marginTop: 6, textAlign: "center" }}
                    >
                      <img
                        src="Images/temp_img2.png"
                        alt="..."
                        style={{ opacity: "0.8", maxWidth: "100%" }}
                      />
                    </div> */}
                    {/* /.col */}
                  </div>
                </form>
              </div>
              {/* /.login-card-body */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TemperatureRecord;
