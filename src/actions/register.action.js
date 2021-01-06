import {
  HTTP_REGISTER_FETCHING,
  HTTP_REGISTER_SUCCESS,
  HTTP_REGISTER_FAILED,
  server,
  OK,
} from "../constants";
import { httpClient } from "./../utils/HttpClient";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const setRegisterStateToFetching = () => ({
  type: HTTP_REGISTER_FETCHING,
});

export const setRegisterStateToSuccess = (payload) => ({
  type: HTTP_REGISTER_SUCCESS,
  payload: payload,
});

export const setRegisterStateToFailed = (payload) => ({
  type: HTTP_REGISTER_FAILED,
  payload: payload,
});

function isEmailAddress(str) {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(str); // returns a boolean
}

export const register = (history, credential) => {
  return async (dispatch) => {
    dispatch(setRegisterStateToFetching());
    if (credential.username.length < 4) {
      dispatch(setRegisterStateToFailed("username lenght should be 4-20"));
      return;
    }

    if (credential.password.length < 6) {
      dispatch(setRegisterStateToFailed("Password lenght should be 6-20"));
      return;
    }

    if (credential.empNumber.length < 4) {
      dispatch(
        setRegisterStateToFailed("Employee number lenght should be 4-6")
      );
      return;
    }

    if (credential.email === "" || credential.email === null) {
      dispatch(setRegisterStateToFailed("Please fill your email"));
      return;
    }

    if (!isEmailAddress(credential.email)) {
      dispatch(
        setRegisterStateToFailed("it not email address, please try again")
      );
      return;
    }

    if (credential.divisionCode === "" || credential.divisionCode == null) {
      dispatch(setRegisterStateToFailed("Please select division code..."));
      return;
    }

    if (credential.password !== credential.confirmPassword) {
      //alert("Password not match");
      dispatch(setRegisterStateToFailed("Password not match"));
    } else {
      try {
        let resultBackend = await httpClient.post(
          server.REGISTER_URL,
          credential
        );
        if (resultBackend.data.message === OK) {
          dispatch(setRegisterStateToSuccess(resultBackend.data.result));
          MySwal.fire({
            icon: "success",
            title: ":D  Register completed!",
            text: "Please verify your email before login...",
          });
          history.goBack();
        } else {
          // alert(JSON.stringify(resultBackend.data.error) );
          dispatch(setRegisterStateToFailed("backend error"));
        }
      } catch (error) {
        dispatch(setRegisterStateToFailed(JSON.stringify(error)));
      }
    }
  };
};
