import React, { Component } from "react";
import { Animated } from "react-animated-css";
import { key, YES, server } from "../../constants/index";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
import { connect } from "react-redux";
import { httpClient } from "../../utils/HttpClient";

class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      imgData: null,
    };
  }

  componentDidMount() {
    this.getCovidData();
    this.isMember();
    window.scrollTo(0, 0);
    // this.getHomeImg();
  }

  getHomeImg = async () => {
    if (this.state.imgData == null) {
      let result = await httpClient.get(server.HOME_IMAGE_URL);
      this.setState({ imgData: result.data.result });
    }
  };

  getCovidData = async () => {
    let resultCovidAPI = await axios.get(
      "https://covid19.th-stat.com/api/open/today"
    );

    if (resultCovidAPI != null) {
      this.setState({ data: resultCovidAPI.data });
    }
  };

  dataConfirmed = () => {
    if (this.state.data != null) {
      return this.state.data.Confirmed;
    }
  };

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  bufferToBase64 = (fileData, fileType) => {
    var binary = "";
    var bytes = new Uint8Array(fileData);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return "data:" + fileType + ";base64," + window.btoa(binary);
  };

  Slideshow = () => {
    if (this.state.imgData != null) {
      var images = [];
      this.state.imgData.map((item) => {
        images.push(this.bufferToBase64(item.fileData.data, item.fileType));
      });
      const zoomInProperties = {
        indicators: true,
        scale: 1.5,
      };

      return (
        <div
          style={{
            maxWidth: 300,
            display: "block",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Zoom {...zoomInProperties}>
            {images.map((each, index) => (
              <div key={index} style={{ width: "100%" }}>
                <img
                  style={{
                    objectFit: "fill",
                    width: "100%",
                  }}
                  src={each}
                />
              </div>
            ))}
          </Zoom>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="content-wrapper" id="wrapper">
        <div class="col-sm-12" style={{ textAlign: "center" }}>
          <Animated animationIn="slideInDown">
            <h1>
              สถานการณ์ Covid 19<small> ในประเทศไทย</small>
            </h1>
          </Animated>
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6" style={{ textAlign: "left" }}>
                  <Link to="/temperature_record">
                    <span
                      className="iconify"
                      data-icon="fa-solid:temperature-high"
                    />{" "}
                    record body temperature
                  </Link>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item active">
                      Last update :{" "}
                      {this.state.data != null &&
                        // moment
                        //   .utc(this.state.data.UpdateDate)
                        //   .format("DD-MMM-YYYY hh:mm")
                        this.state.data.UpdateDate}
                    </li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          <div className="content">
            {/* <div className="card">{this.Slideshow()}</div> */}
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box">
                    <span className="info-box-icon bg-danger elevation-1">
                      <span
                        className="iconify"
                        data-icon="fa-solid:disease"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">ผู้ป่วยยืนยันสะสม</span>
                      <span className="info-box-number">
                        {this.state.data != null && this.state.data.Confirmed}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-success elevation-1">
                      <span
                        className="iconify"
                        data-icon="medical-icon:health-services"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">รักษาหายแล้วสะสม</span>
                      <span className="info-box-number">
                        {this.state.data != null && this.state.data.Recovered}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                {/* fix for small devices only */}
                <div className="clearfix hidden-md-up" />
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-warning elevation-1">
                      <span
                        className="iconify"
                        data-icon="mdi:hospital-marker"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">กำลังรักษา</span>
                      <span className="info-box-number">
                        {this.state.data != null &&
                          this.state.data.Hospitalized}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>
                {/* /.col */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className="info-box mb-3">
                    <span className="info-box-icon bg-secondary elevation-1">
                      <span
                        className="iconify"
                        data-icon="fa-solid:book-dead"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">เสียชีวิตสะสม</span>
                      <span className="info-box-number">
                        {this.state.data != null && this.state.data.Deaths}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                  {/* /.info-box */}
                </div>

                <div className="col-md-3">
                  <div className="info-box mb-3 bg-danger">
                    <span className="info-box-icon">
                      <span
                        className="iconify"
                        data-icon="medical-icon:infectious-diseases"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">ผู้ป่วยใหม่</span>
                      <span className="info-box-number">
                        {this.state.data != null &&
                          this.state.data.NewConfirmed}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info-box mb-3 bg-success">
                    <span className="info-box-icon">
                      <span
                        className="iconify"
                        data-icon="mdi:hospital-box-outline"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">รักษาหาย</span>
                      <span className="info-box-number">
                        {this.state.data != null &&
                          this.state.data.NewRecovered}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info-box mb-3 bg-warning">
                    <span className="info-box-icon">
                      <span
                        className="iconify"
                        data-icon="fa-solid:hospital-user"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">เข้ารับการรักษา</span>
                      <span className="info-box-number">
                        {this.state.data != null &&
                          this.state.data.NewHospitalized}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="info-box mb-3 bg-secondary">
                    <span className="info-box-icon">
                      <span
                        className="iconify"
                        data-icon="mdi:emoticon-dead"
                        data-inline="false"
                      />
                    </span>
                    <div className="info-box-content">
                      <span className="info-box-text">เสียชีวิต</span>
                      <span className="info-box-number">
                        {this.state.data != null && this.state.data.NewDeaths}
                        <small> ราย</small>
                      </span>
                    </div>
                    {/* /.info-box-content */}
                  </div>
                </div>

                {/* /.col */}
              </div>
            </div>
          </div>
          {/* Info */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(home);
