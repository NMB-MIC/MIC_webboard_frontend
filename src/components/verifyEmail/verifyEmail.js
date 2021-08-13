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
      registerKey: null,
    };
  }

  componentDidMount = async () => {
    document.title = APP_TITLE + " Verify email";

    let username = this.props.match.params.username;
    let registerKey = this.props.match.params.registerKey;
    console.log(username);
    console.log(registerKey);
    await this.setState({ username, registerKey });
    this.isMember();
    this.verifyUserEmail();

    //alert(username + "./" + registerKey)
  }

  verifyUserEmail = async () => {
    console.log('verrify');
    if (this.state.username != null && this.state.registerKey != null) {
      let result = await httpClient.get(
        server.VERIFY_EMAIL_URL +
          `/${this.state.username}&${this.state.registerKey}`
      );

      if (result.data.api_result === OK) {
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
