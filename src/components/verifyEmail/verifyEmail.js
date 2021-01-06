import React, { Component } from "react";
import { APP_TITLE } from "./../../constants/index";
import { key, YES, server, OK } from "./../../constants/index";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { httpClient } from "./../../utils/HttpClient";


const ReactSwal = withReactContent(Swal);

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      randomKey: null,
    };
  }

  componentDidMount = async () => {
    document.title = APP_TITLE + " Verify email";

    let username = this.props.match.params.username;
    let randomKey = this.props.match.params.randomKey;

    await this.setState({ username, randomKey });
    this.isMember();
    this.verifyEmail();

    //alert(username + "./" + randomKey)
  }

  verifyEmail = async () => {
    if (this.state.username != null && this.state.randomKey != null) {
      let result = await httpClient.get(
        server.VERIFY_EMAIL_URL +
          `/${this.state.username}&${this.state.randomKey}`
      );
      
      if (result.data.message === OK) {
        ReactSwal.fire({
          title: "OK...",
          html: "Your email has been verified <p>Please login</p>",
          icon: "success",
          timer: 2000,
        });
        this.props.history.push("/login")
      } else {
        ReactSwal.fire({
          title: "Oops...",
          html: "Backend error ,please try again",
          icon: "error",
          timer: 2000,
        });
      }
    }
  };

  isMember = () => {
    if (localStorage.getItem(key.LOGIN_PASSED) === YES) {
      document.getElementById("wrapper").className = "content-wrapper";
    } else {
      document.getElementById("wrapper").className = "";
    }
  };

  render() {
    return (
      <div id="wrapper" className="content-wrapper">
        <div
          id="capture"
          className="login-page"
          style={{ backgroundColor: "rgba(30, 30, 35, 0.8)", minHeight: 720 }}
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
                src="/images/NMB_logo.png"
                style={{ textAlign: "center", maxHeight: 70 }}
              />
              <br></br>
              <span class="iconify" data-icon="mdi:email-check" data-inline="false"></span>
              <b>verify </b>
              email
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyEmail;
